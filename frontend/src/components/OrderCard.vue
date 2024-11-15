<script setup>
defineProps({
    order: { type: Object, required: true }, // Thay contact thành customer
});

function formatOrderNote(note) {
    if (!note) return '';
    // Tách chuỗi theo dấu phẩy và loại bỏ khoảng trắng thừa
    const items = note.split(',').map(item => item.trim());
    // Nối các phần tử lại với thẻ <br>
    return items.join('<br>');
}
</script>

    <template>
        <div>
            <div class="p-1">
                <strong>ID đơn hàng:</strong>
                {{ order.order_id }}
            </div>
            <div class="p-1">
                <strong>ID khách hàng:</strong>
                {{ order.customer_id }}
            </div>
            <div class="p-1">
                <strong>Ngày đặt hàng:</strong>
                {{ order.order_date }}
            </div>
            <div class="p-1">
                <strong>Tổng đơn hàng:</strong>
                {{ order.order_total }} đ <!-- Thêm ký hiệu tiền tệ -->
            </div>
            <div class="p-1">
                <strong>Phương thức thanh toán:</strong>
                {{ order.order_payment_method }}
            </div>
            <div class="p-1">
                <strong>Trạng thái đơn hàng:</strong>
                {{ order.order_status }}
            </div>
            <div class="p-1">
                <strong>Ghi chú đơn hàng:</strong>
                <div v-html="formatOrderNote(order.order_note)"></div> <!-- Thay về v-html để hiển thị HTML -->
              
            </div>
        </div>
    </template>


