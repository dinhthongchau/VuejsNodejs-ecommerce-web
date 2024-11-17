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
  product_image: props.product.product_image
});

let imageFileInput = useTemplateRef('image-file-input');
let imageFile = ref(props.product.product_image);
const $emit = defineEmits(['submit:product', 'delete:product']);

let validationSchema = toTypedSchema(
  z.object({
    product_name: z
      .string()
      .min(1, { message: 'Tên sản phẩm là bắt buộc.' })
      .max(255, { message: 'Tên sản phẩm tối đa 255 ký tự.' }),
    product_price: z
      .preprocess((value) => parseFloat(value), z.number()
        .min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0.' })
        .max(9999999999.99, { message: 'Giá sản phẩm vượt quá giới hạn.' })),
    product_color: z.string().max(100, { message: 'Màu sắc sản phẩm tối đa 100 ký tự.' }),
    product_description: z.string().optional(),
    product_imageFiles: z.instanceof(File).optional()
  })
);

function previewImageFile(event) {
  const files = Array.from(event.target.files);
  imageFile.value = [];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      imageFile.value.push(evt.target.result);
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
    message.value = 'Sản phẩm được sửa thành công!';
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
      <Field name="product_description" as="textarea" rows="5" class="form-control"
        v-model="product.product_description" style="min-height: 100px; resize: vertical;" />
      <ErrorMessage name="product_description" class="error-feedback" />
    </div>

    <div class="mb-3">
      <label for="product_image" class="form-label">Hình ảnh:</label>
      <input type="file" class="form-control" multiple
        @change="e => { previewImageFile(e); product.product_image = e.target.files }" />
    </div>

    <!-- Preview ảnh -->
    <div class="mb-3">
      <!-- Preview cho ảnh mới upload -->
      <div v-if="Array.isArray(imageFile) && imageFile.length" class="d-flex flex-wrap">
        <div v-for="(img, index) in imageFile" :key="index" class="p-1" style="width: 150px; height: 150px;">
          <img :src="img" alt="Preview" class="img-fluid img-thumbnail"
            style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>

      <!-- Preview cho ảnh đã có -->
      <div v-else-if="typeof product.product_image === 'string' && product.product_image.startsWith('[')"
        class="d-flex flex-wrap">
        <div v-for="(image, index) in JSON.parse(product.product_image)" :key="index" class="p-1"
          style="width: 150px; height: 150px;">
          <img :src="image.replace(/\\/, '')" alt="No Image" class="img-fluid img-thumbnail"
            style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </div>
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