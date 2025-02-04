<?php

declare(strict_types=1);

/*
 * Copyright (c) Billie GmbH
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Billie\BilliePayment\Components\Checkout\Subscriber;

use Billie\BilliePayment\Components\PaymentMethod\Util\MethodHelper;
use Shopware\Core\Framework\Validation\BuildValidationEvent;
use Shopware\Core\Framework\Validation\DataValidationDefinition;
use Shopware\Core\PlatformRequest;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Validator\Constraints\NotBlank;

class CheckoutValidationSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly RequestStack $requestStack
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            'framework.validation.order.create' => ['validateOrderData', 10],
        ];
    }

    public function validateOrderData(BuildValidationEvent $event): void
    {
        $request = $this->requestStack->getCurrentRequest();
        if (!$request instanceof Request) {
            // should never occur. just to be save.
            return;
        }

        $salesChannelContext = $this->getSalesContextFromRequest($request);

        if (MethodHelper::isBilliePayment($salesChannelContext->getPaymentMethod())) {
            $definitions = new DataValidationDefinition();
            $definitions->add('session-id', new NotBlank());
            $event->getDefinition()->addSub('billie_payment', $definitions);
        }
    }

    private function getSalesContextFromRequest(Request $request): SalesChannelContext
    {
        return $request->attributes->get(PlatformRequest::ATTRIBUTE_SALES_CHANNEL_CONTEXT_OBJECT);
    }
}
