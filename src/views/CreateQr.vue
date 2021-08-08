<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">Generate new QR codes</h3>

    <div class="mt-4">
      <div
          class="w-full max-w-sm overflow-hidden bg-white border rounded-md shadow-md"
      >
        <form>
          <div
              class="flex items-center justify-between px-5 py-3 text-gray-700 border-b"
          >
            <h3 class="text-sm">How many QRs do you want to generate?</h3>
          </div>

          <div class="px-5 py-6 text-gray-700 bg-gray-200 border-b">
            <label class="text-xs">Number</label>

            <div class="relative mt-2 rounded-md shadow-sm">
                <span
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <svg
                      class="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </span>

              <input
                  type="text"
                  v-model="totalToGenerate.total"
                  class="w-full px-12 py-2 border-transparent rounded-md appearance-none focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-between px-5 py-3">
            <a
                class="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                v-on:click="generate"
            >
              Generate
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useEnvVars } from '../modules/env';
import { useApi } from "../modules/api";
import { useUuid } from '../modules/uuid';
interface Qr {
  id: string
}

export default defineComponent({
  setup() {
    const { loadEnv } = useEnvVars();
    const { put } = useApi(loadEnv().qrengine_url + "qr");
    const { uuidv4 } = useUuid();
    const totalToGenerate = reactive({
      total: ''
    });
    const generate = () => {
      for (let i = 0; i < totalToGenerate.total; i++) {
        const qrIdentifier = <Qr>({
          id: uuidv4().id
        });
        const params = qrIdentifier.id;
        put(params, '').then(() => {
          console.log('created!');
        });
      }
    };
    return {
      generate,
      totalToGenerate
    };
  },
});
</script>
