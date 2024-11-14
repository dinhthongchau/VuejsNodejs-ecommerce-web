<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const props = defineProps({
  customer: { type: Object, required: true }
});


const $emit = defineEmits(['submit:customer', 'delete:customer']);

// let validationSchema = toTypedSchema(
//   z.object({
// //     name: z
// //       .string()
// //       .min(2, { message: 'Tên phải ít nhất 2 ký tự.' })
// //       .max(50, { message: 'Tên có nhiều nhất 50 ký tự.' }),
// //     email: z
// //       .string()
// //       .email({ message: 'E-mail không đúng.' })
// //       .max(50, { message: 'E-mail tối đa 50 ký tự.' }),
// //     address: z.string().max(100, { message: 'Địa chỉ tối đa 100 ký tự.' }),
// //     phone: z
// //       .string()
// //       .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g, {
// //         message: 'Số điện thoại không hợp lệ.'
// //       }),
// //     favorite: z.number().optional(),
// //     avatarFile: z.instanceof(File).optional()
//     customer_name: z
//       .string()
//       .min(1, { message: 'Tên sản phẩm là bắt buộc.' })
//       .max(255, { message: 'Tên sản phẩm tối đa 255 ký tự.' }),
//     customer_email: z
//       .number()
//       .min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0.' })
//       .max(9999999999.99, { message: 'Giá sản phẩm vượt quá giới hạn.' }),
//     customer_phone: z.string().max(100, { message: 'Màu sắc sản phẩm tối đa 100 ký tự.' }),
//     customer_address: z.string().optional(),
  
//   })
// );



function submitCustomer(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  $emit('submit:customer', formData);
}

function deleteCustomer() {
  $emit('delete:customer', props.customer.customer_id);
}

</script>



<template>
  <Form  @submit="submitCustomer">
   
    <div>
      <label for="customer_name" class="form-label">Tên KH</label>
      <Field name="customer_name" type="text" class="form-control" :value="customer.customer_name" />
      <ErrorMessage name="customer_name" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="customer_email" class="form-label">EMAIL</label>
      <Field name="customer_email" type="text" class="form-control" :value="customer.customer_email" />
      <ErrorMessage name="customer_email" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="customer_phone" class="form-label">SDT</label>
      <Field name="customer_phone" type="text" class="form-control" :value="customer.customer_phone" />
      <ErrorMessage name="customer_phone" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="customer_address" class="form-label">ADDRESS</label>
      <Field
        name="customer_address"
        type="text"
        class="form-control"
        :value="customer.customer_address"
      />
      <ErrorMessage name="customer_address" class="error-feedback" />
    </div>
    <!-- <div class="mb-3 form-check">
      <Field
        name="favorite"
        type="checkbox"
        class="form-check-input"
        :model-value="customer.favorite"
        :value="1"
        :unchecked-value="0"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div> -->
    <div class="mb-3">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button v-if="customer.customer_id" type="button" class="ms-2 btn btn-danger" @click="deleteCustomer">
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
</template>
<!-- <style scoped>
@import '@/assets/form.css';
</style> -->
