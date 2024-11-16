<script setup>
import { ref, useTemplateRef } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const props = defineProps({
  product: { type: Object, required: true }
  
});
const apiUrl = import.meta.env.VITE_API_URL;
const product = ref({
  product_name: props.product.product_name,
  product_price: props.product.product_price,
  product_color: props.product.product_color,
  product_description: props.product.product_description,
  product_image: props.product.product_image // Chứa danh sách file hình ảnh
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

// function previewImageFile(event) {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.onload = (evt) => {
//     imageFile.value = evt.target.result;
//   };
//   reader.readAsDataURL(file);
// }
function previewImageFile(event) {
  const files = Array.from(event.target.files);
  imageFile.value = []; // Xóa mảng cũ

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      imageFile.value.push(evt.target.result); // Lưu từng ảnh vào danh sách imageFile
    };
    reader.readAsDataURL(file);
  });
}



function deleteProduct() {
  $emit('delete:product', props.product.product_id);
}

const message = ref('');

async function onCreateProduct() {
  try {
    const formData = new FormData();
    formData.append('product_id', props.product.product_id);
    formData.append('product_name', product.value.product_name);
    formData.append('product_price', product.value.product_price);
    formData.append('product_color', product.value.product_color);
    formData.append('product_description', product.value.product_description);

    for (let i = 0; i < product.value.product_image.length; i++) {
      formData.append('product_imageFiles', product.value.product_image[i]);
    }

    const response = await fetch(`${apiUrl}/v1/products/${props.product.product_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    message.value = 'Sản phẩm được tạo thành công!';
    console.log(result);
  } catch (error) {
    console.error(error);
    message.value = 'Tạo sản phẩm thất bại.';
  }
}



</script>



<template>
  <Form :validation-schema="validationSchema" @submit="onCreateProduct">

    <div>
      <label for="product_name" class="form-label">Tên sản phẩm</label>
      <Field name="product_name" type="text" class="form-control" v-model="product.product_name" />
      <ErrorMessage name="product_name" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_price" class="form-label">Giá</label>
      <Field name="product_price" type="text" class="form-control" v-model="product.product_price" />
      <ErrorMessage name="product_price" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_color" class="form-label">Màu sắc</label>
      <Field name="product_color" type="text" class="form-control" v-model="product.product_color" />
      <ErrorMessage name="product_color" class="error-feedback" />
    </div>
    <div class="mb-3">
      <label for="product_description" class="form-label">Mô tả</label>
      <Field name="product_description" type="text" class="form-control" v-model="product.product_description" />
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
      <label for="product_image" class="form-label">Hình ảnh:</label>
      <input type="file" class="form-control" multiple @change="e => product.product_image = e.target.files" />
    </div>
    
    <div v-if="Array.isArray(imageFile) && imageFile.length">
      <div v-for="(img, index) in imageFile" :key="index" class="p-1 w-75 h-75">
        <img class="img-fluid img-thumbnail" :src="img" alt="No Image" />
      </div>
    </div>

    <div v-else-if="typeof product.product_image === 'string'">
      <template v-if="product.product_image.startsWith('[')">
        <div v-for="(image, index) in JSON.parse(product.product_image)" :key="index" class="p-1 w-75 h-75">
          <img class="img-fluid img-thumbnail" :src="image.replace(/\\/, '')" alt="No Image" />
        </div>
      </template>

    </div>


    <div class="mb-3">
      <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
      <button v-if="product.product_id" type="button" class="ms-2 btn btn-danger" @click="deleteProduct">
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </Form>
  <p>{{ message }}</p>
</template>
<!-- <style scoped>
@import '@/assets/form.css';
</style> -->
