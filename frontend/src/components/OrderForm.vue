<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const props = defineProps({
  order: { type: Object, required: true }
});


const $emit = defineEmits(['submit:order', 'delete:order']);




function submitOrder(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  $emit('submit:order', formData);
}

function deleteOrder() {
  $emit('delete:order', props.order.order_id);
}

</script>



<template>
  <Form @submit="submitOrder">
    
    <div class="mb-3">
      <label for="order_id" class="form-label">Mã Đơn Hàng</label>
      <Field name="order_id" type="text" class="form-control" :value="order.order_id" readonly />
      <ErrorMessage name="order_id" class="error-feedback" />
    </div>


    <div class="mb-3">
      <label for="customer_id" class="form-label">Mã Khách Hàng</label>
      <Field name="customer_id" type="text" class="form-control" :value="order.customer_id" readonly />
      <ErrorMessage name="customer_id" class="error-feedback" />
    </div>

 
    <div class="mb-3">
      <label for="order_date" class="form-label">Ngày Đặt Hàng</label>
      <Field name="order_date" type="text" class="form-control" :value="order.order_date" readonly />
      <ErrorMessage name="order_date" class="error-feedback" />
    </div>

 
    <div class="mb-3">
      <label for="order_total" class="form-label">Tổng Đơn Hàng</label>
      <Field name="order_total" type="number" class="form-control" :value="order.order_total" readonly />
      <ErrorMessage name="order_total" class="error-feedback" />
    </div>

  
    <div class="mb-3">
      <label for="order_payment_method" class="form-label">Phương Thức Thanh Toán</label>
      <Field name="order_payment_method" type="text" class="form-control" v-model="order.order_payment_method" />
      <ErrorMessage name="order_payment_method" class="error-feedback" />
    </div>


    <div class="mb-3">
      <label for="order_status" class="form-label">Trạng Thái Đơn Hàng</label>
      <Field name="order_status" type="text" class="form-control" v-model="order.order_status" />
      <ErrorMessage name="order_status" class="error-feedback" />
    </div>

  
    <div class="mb-3">
      <label for="order_note" class="form-label">Ghi Chú Đơn Hàng</label>
      <Field name="order_note" as="textarea" class="form-control" v-model="order.order_note" rows="4" />
      <ErrorMessage name="order_note" class="error-feedback" />
    </div>

    <!-- Lưu và Xóa -->
    <div class="mb-3">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button v-if="order.order_id" type="button" class="ms-2 btn btn-danger" @click="deleteOrder">
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
</template>

