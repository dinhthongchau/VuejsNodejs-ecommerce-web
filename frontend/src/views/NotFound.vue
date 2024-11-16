<template>
    <div>
        <h1>Send Email</h1>
        <form @submit.prevent="sendEmail">
            <input v-model="emailData.to" type="email" placeholder="Recipient Email" required />
            <input v-model="emailData.subject" type="text" placeholder="Subject" required />
            <textarea v-model="emailData.text" placeholder="Message" required></textarea>
            <button type="submit">Send Email</button>
        </form>
        <p v-if="responseMessage">{{ responseMessage }}</p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            emailData: {
                to: "thongb2111955@student.ctu.edu.vn",
                subject: "ko gi ",
                text: "test thoié",
                html: "",
            },
            responseMessage: "",
        };
    },
    methods: {
        async sendEmail() {
            try {
                const response = await axios.post("http://localhost:3300/send-email", this.emailData);
                this.responseMessage = response.data.message;
            } catch (error) {
                this.responseMessage = "Failed to send email: " + error.response.data.message;
            }
        },
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
