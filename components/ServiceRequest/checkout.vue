<template>
  <div>
    <div>
      <Additional :isShowButton="false">
        <template #content>
          <h1 class="font-bold text-[18px] text-[#000000]">Payment</h1>
          <p class="text-base font-medium text-gray-400">Payment with paypal</p>
          <div class="flex items-center">
            <p class="text-sm text-[#151515] font-normal mt-3 mb-3">Paypal</p>
            <div
              class="h-full mx-2 w-[86%] relative before:absolute before:inset-x-0 before:bottom-0 before:h-[1px] before:bg-gradient-to-r before:from-[#DDDDDD] before:to-[#FFFFFF]"
            ></div>
          </div>
          <div class="grid grid-cols-2 gap-7">
            <div id="paypal-button"></div>
          </div>
        </template>
      </Additional>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    totalPrice: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      capturePayment: "service/capturePayment",
    }),
    renderPayPalButton() {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: this.totalPrice,
                    },
                  },
                ],
              });
            },

            onApprove: async (data, actions) => {
              try {
                let response = await this.capturePayment({
                  orderId: data.orderID,
                });
                this.$emit("approvePayment", response.data);
              } catch (error) {
                console.error("Api Error:", error);
              }
            },
            onError: (err) => {
              console.error("PayPal Button Error:", err);
            },
          })
          .render("#paypal-button");
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.renderPayPalButton();
    }, 1000);
  },
};
</script>
