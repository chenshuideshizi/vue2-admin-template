<template>
    <div>
        <form>
            <div>
                <label>
                    用户名: <input v-model="loginForm.username" type="text">
                </label>
            </div>

            <div>
                <label>
                    密码: <input v-model="loginForm.password" type="password">
                </label>
            </div>

            <div>
                <button @click="handleLogin" type="button">登录</button>
            </div>

            <div class="tip-msg" v-if="msg">{{msg}}</div>
        </form>
    </div>
</template>

<script>
import { login } from '@/api/login'
export default {
    name: 'About',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            msg: ''
        }
    },
    methods: {
        async handleLogin() {
            const [res, err] = await login(this.loginForm)
            debugger

            if (err) {
                this.msg = err.msg
                return
            }

            this.msg = '登录成功'

            this.$router.push({path: '/'})
        }
    }
}
</script>

<style scoped>

</style>