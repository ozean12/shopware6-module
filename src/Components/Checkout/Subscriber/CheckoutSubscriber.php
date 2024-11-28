<?php

declare(strict_types=1);

/*
 * Copyright (c) Billie GmbH
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Billie\BilliePayment\Components\Checkout\Subscriber;

use Billie\BilliePayment\Components\Checkout\Service\WidgetService;
use Billie\BilliePayment\Components\PaymentMethod\Util\MethodHelper;
use Billie\Sdk\Exception\BillieException;
use Billie\Sdk\Exception\Validation\InvalidFieldValueCollectionException;
use Billie\Sdk\Exception\Validation\InvalidFieldValueException;
use RuntimeException;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Storefront\Page\Account\Order\AccountEditOrderPageLoadedEvent;
use Shopware\Storefront\Page\Checkout\Confirm\CheckoutConfirmPageLoadedEvent;
use Shopware\Storefront\Page\PageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CheckoutSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly WidgetService $widgetService
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            CheckoutConfirmPageLoadedEvent::class => ['addWidgetData', 310],
            AccountEditOrderPageLoadedEvent::class => ['addWidgetData', 310],
        ];
    }

    public function addWidgetData(PageLoadedEvent $event): void
    {
        if (!$event instanceof CheckoutConfirmPageLoadedEvent && !$event instanceof AccountEditOrderPageLoadedEvent) {
            throw new RuntimeException('method ' . self::class . '::' . __METHOD__ . ' does not supports a parameter of type' . $event::class);
        }

        $paymentMethod = $event->getSalesChannelContext()->getPaymentMethod();
        if (MethodHelper::isBilliePayment($paymentMethod) && $event->getPage()->getPaymentMethods()->has($paymentMethod->getId())) {
            /** @var ArrayStruct $extension */
            $extension = $event->getPage()->getExtension('billie_payment') ?? new ArrayStruct();

            try {
                if ($event instanceof CheckoutConfirmPageLoadedEvent) {
                    $widgetData = $this->widgetService->getWidgetDataBySalesChannelContext($event->getSalesChannelContext());
                } elseif ($event instanceof AccountEditOrderPageLoadedEvent) {
                    $widgetData = $this->widgetService->getWidgetDataByOrder($event->getPage()->getOrder(), $event->getSalesChannelContext());
                } else {
                    throw new RuntimeException('invalid event: ' . gettype($event));
                }

                if ($widgetData instanceof ArrayStruct) {
                    $extension->set('widget', $widgetData->all());
                }
            } catch (InvalidFieldValueCollectionException $invalidFieldValueCollectionException) {
                $extension->set('errors', array_map(static fn (InvalidFieldValueException $e): string => $e->getMessage(), $invalidFieldValueCollectionException->getErrors()));
            } catch (BillieException $billieException) {
                $extension->set('errors', [$billieException->getMessage()]);
            }

            if ($extension->all() !== []) {
                $event->getPage()->addExtension('billie_payment', $extension);
            }
        }
    }
}
