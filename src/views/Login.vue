<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <span class="text-2xl font-semibold text-gray-700">SurfSOS</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            v-model="username"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            v-model="password"
          />
        </label>

        <div class="flex items-center justify-between mt-4">
          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
              >Forgot your password?</a
            >
          </div>
        </div>

        <div class="mt-6">
          <button
              type="submit"
              v-on:click="submit"
              class="group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red disabled:bg-red-900 active:bg-red-700 transition duration-150 ease-in-out"
              :disabled="loading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                  class="h-5 w-5 text-red-200 group-hover:text-red-200 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
              >
                <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onErrorCaptured,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../modules/api";
import { useAuth } from "../modules/auth";
interface LoginPayload {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const { loading, data, post, errorMessage } = useApi(
        "login"
    );
    const { setUser } = useAuth();
    const router = useRouter();
    const payload = reactive<LoginPayload>({
      username: 'admin@surfsos.com',
      password: ''
    });
    const submit = () => {
      post(payload).then(() => {
        setUser(data.value);
        router.push("dashboard");
      });
    };
    return {
      loading,
      submit,
      errorMessage,
      ...toRefs(payload),
    };
  },
});
</script>
