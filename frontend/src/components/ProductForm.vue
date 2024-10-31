<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
//import { toTypedSchema } from '@vee-validate/zod';
//import { z } from 'zod';
const props = defineProps({
  product: { type: Object, required: true }
});

let imageFileInput = useTemplateRef('image-file-input');
let imageFile = ref(props.product.image);
const $emit = defineEmits(['submit:product', 'delete:product']);

// let validationSchema = toTypedSchema(
//   z.object({
//     name: z
//       .string()
//       .min(2, { message: 'Tên phải ít nhất 2 ký tự.' })
//       .max(50, { message: 'Tên có nhiều nhất 50 ký tự.' }),
//     email: z
//       .string()
//       .email({ message: 'E-mail không đúng.' })
//       .max(50, { message: 'E-mail tối đa 50 ký tự.' }),
//     address: z.string().max(100, { message: 'Địa chỉ tối đa 100 ký tự.' }),
//     phone: z
//       .string()
//       .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g, {
//         message: 'Số điện thoại không hợp lệ.'
//       }),
//     favorite: z.number().optional(),
//     avatarFile: z.instanceof(File).optional()
//   })
// );

function previewImageFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    imageFile.value = evt.target.result;
  };
  reader.readAsDataURL(file);
}

function submitProduct(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }
  $emit('submit:product', formData);
}

function deleteProduct() {
  $emit('delete:product', props.product.product_id);
}

</script>



<template>
  <Form :validation-schema="validationSchema" @submit="submitProduct">
    <div class="mb-3 w-50 h-50">
      <img
        class="img-fluid img-thumbnail"
        :src="imageFile"
        alt=""
        @click="imageFileInput.click()"
      />
      <Field name="imageFile" v-slot="{ handleChange }">
        <input
          type="file"
          class="d-none"
          ref="image-file-input"
          @change="
            (event) => {
              handleChange(event);
              previewImageFile(event);
            }
          "
        />
      </Field>
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Tên</label>
      <Field name="name" type="text" class="form-control" :value="product.product_name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Giá</label>
      <Field name="price" type="price" class="form-control" :value="product.product_price" />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="color" class="form-label">Màu sắc</label>
      <Field name="color" type="color" class="form-control" :value="product.product_color" />
      <ErrorMessage name="color" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Mô tả chi tiết</label>
      <Field name="description" type="description" class="form-control" :value="product.product_description" />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <!-- <div class="mb-3 form-check">
      <Field
        name="favorite"
        type="checkbox"
        class="form-check-input"
        :model-value="product.favorite"
        :value="1"
        :unchecked-value="0"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div> -->
    <div class="mb-3">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button v-if="product.product_id" type="button" class="ms-2 btn btn-danger" @click="deleteProduct">
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
</template>
<!-- <style scoped>
@import '@/assets/form.css';
</style> -->
