<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Customers Grid</h3>

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
            class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
          >
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                  v-on:click="paginatePrev"
              >
                Prev
              </button>
              <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                  v-on:click="paginateNext"
              >
                Next
              </button>
            </div>
          </div>
          <table class="min-w-full">
            <thead>
            <tr>
              <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Name
              </th>
              <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Lastname
              </th>
              <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Email
              </th>
              <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Phone
              </th>
            </tr>
            </thead>

            <tbody class="bg-white">
            <tr v-for="(user, index) in customersList" :key="index">
              <td
                  class="px-2 py-2 border-b border-gray-200 whitespace-nowrap"
              >
                <div class="ml-4">
                  <div class="text-sm font-medium leading-5 text-gray-900">
                    {{ user.name }}
                  </div>
                </div>
              </td>

              <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ user.lastname }}
                </div>
              </td>

              <td
                  class="px-6 py-6 border-b border-gray-200 whitespace-nowrap"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ user.email }}
                </div>
              </td>

              <td
                  class="px-6 py-6 border-b border-gray-200 whitespace-nowrap"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ user.phone }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div
              class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
          >
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
                  v-on:click="paginatePrev"
              >
                Prev
              </button>
              <button
                  class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
                  v-on:click="paginateNext"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useListCustomers } from '../../modules/customers/list-customers';
import { useCountCustomers } from '../../modules/customers/count-customers';
import { usePagination } from "vue-composable";

export default defineComponent({
  setup() {
    const { listCustomers } = useListCustomers();
    const { countCustomers } = useCountCustomers();
    const totalCustomers = ref(0);
    const customersList = ref([]);
    const { currentPage, pageSize, next, prev } = usePagination({
      currentPage: 0,
      pageSize: 6,
      total: computed(() => totalCustomers.value)
    });
    countCustomers().then((data) => {
      totalCustomers.value = data.total;
      updateList();
    });
    const updateList = () => {
      const requestString = {
        'offset': (currentPage.value > 1)
            ? pageSize.value * (currentPage.value - 1)
            : 0,
        'limit': pageSize.value
      }
      listCustomers(requestString).then(response => {
        customersList.value = response;
      });
    }
    const paginatePrev = () => {
      prev();
      updateList();
    };
    const paginateNext = () => {
      next();
      updateList();
    };

    return {
      customersList,
      totalCustomers,
      paginatePrev,
      paginateNext
    };
  },
});
</script>
