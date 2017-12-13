// 交易平台接口
import {AJAX, HttpMethod} from 'utils/ajax';
import { COMMON } from 'enviroment/config';

class Trade {
    // 创建买家订单
    createBuyOrder = (param) => {
        return AJAX({
            url: `${COMMON}/order/createBuyOrder.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 创建卖家订单
    createSellOrder = (param) => {
        return AJAX({
            url: `${COMMON}/order/createSellOrder.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 查询所有已完成的订单
    findAllFinishedOrdersPage = (param) => {
        return AJAX({
            url: `${COMMON}/order/findAllFinishedOrdersPage.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 通过订单号查询订单
    findOrderByOrderNO = (param) => {
        return AJAX({
            url: `${COMMON}/order/findOrderByOrderNO.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    //  查询用户已完成的订单
    findUserFinishedOrderList = (param) => {
        return AJAX({
            url: `${COMMON}/order/findUserFinishedOrderList.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 查询用户进行中的订单
    findUserUnfinishedOrderList = () => {
        return AJAX({
            url: `${COMMON}/order/findUserUnfinishedOrderList.do`,
            type: HttpMethod.GET
        });
    };

    // 通过撤销订单申请
    passRevokeOrder = (param) => {
        return AJAX({
            url: `${COMMON}/order/passRevokeOrder.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 卖家支付诚意金（卖家创建订单）
    payOrderDepositAmountAfterCreate = (param) => {
        return AJAX({
            url: `${COMMON}/order/payOrderDepositAmountAfterCreate.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 卖家支付诚意金（卖家接受买家订单后）
    payOrderDepositAmountAfterReceive = (param) => {
        return AJAX({
            url: `${COMMON}/order/payOrderDepositAmountAfterReceive.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 买家支付商品金额（买家创建订单）
    payOrderGoodsAmountAfterCreate = (param) => {
        return AJAX({
            url: `${COMMON}/order/payOrderGoodsAmountAfterCreate.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 买家支付商品金额（买家接受卖家订单后）
    payOrderGoodsAmountAfterReceive = (param) => {
        return AJAX({
            url: `${COMMON}/order/payOrderGoodsAmountAfterReceive.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 接受订单
    receiveOrder = (param) => {
        return AJAX({
            url: `${COMMON}/order/receiveOrder.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 拒绝撤销订单申请
    refuseRevokeOrder = (param) => {
        return AJAX({
            url: `${COMMON}/order/refuseRevokeOrder.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 买家确认收货
    updateOrderConfirmReceived = (param) => {
        return AJAX({
            url: `${COMMON}/order/updateOrderConfirmReceived.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 卖家更新订单状态为已发货
    updateOrderShiped = (param) => {
        return AJAX({
            url: `${COMMON}/order/updateOrderShiped.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

    // 申请撤销订单
    updateOrderStatusApplyRevoke = (param) => {
        return AJAX({
            url: `${COMMON}/order/updateOrderStatusApplyRevoke.do`,
            type: HttpMethod.GET,
            data: param
        });
    };

}

export default new Trade();