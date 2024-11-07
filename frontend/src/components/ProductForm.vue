<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const props = defineProps({
  product: { type: Object, required: true }
});

let imageFileInput = useTemplateRef('image-file-input');
let imageFile = ref(props.product.product_image);
const $emit = defineEmits(['submit:product', 'delete:product']);

let validationSchema = toTypedSchema(
  z.object({
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
    product_name: z
      .string()
      .min(1, { message: 'Tên sản phẩm là bắt buộc.' })
      .max(255, { message: 'Tên sản phẩm tối đa 255 ký tự.' }),
    product_price: z
      .number()
      .min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0.' })
      .max(9999999999.99, { message: 'Giá sản phẩm vượt quá giới hạn.' }),
    product_color: z.string().max(100, { message: 'Màu sắc sản phẩm tối đa 100 ký tự.' }),
    product_description: z.string().optional(),
    product_imageFiles: z.instanceof(File).optional()
  })
);

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
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
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
    <div>
      <label for="product_name" class="form-label">Tên sản phẩm</label>
      <Field name="product_name" type="text" class="form-control" :value="product.product_name" />
      <ErrorMessage name="product_name" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_price" class="form-label">Giá</label>
      <Field name="product_price" type="text" class="form-control" :value="product.product_price" />
      <ErrorMessage name="product_price" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_color" class="form-label">Màu sắc</label>
      <Field name="product_color" type="text" class="form-control" :value="product.product_color" />
      <ErrorMessage name="product_color" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_description" class="form-label">Mô tả</label>
      <Field
        name="product_description"
        type="text"
        class="form-control"
        :value="product.product_description"
      />
      <ErrorMessage name="product_description" class="error-feedback" />
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
