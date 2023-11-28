<script lang="ts" setup>
import { ref } from "vue";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
let years: Ref<Array<string>> = ref([]);

const show_toast: Ref<Boolean> = ref(false);

const selected_year: Ref<String> = ref("1900");
const clipboard: Ref<String> = ref("");
const { data: historical_events, pending: loading }: any = await useFetch(
  "https://world-history-timeline.p.rapidapi.com/History-By-Year?",
  {
    onRequest({ options }) {
      // Set the request headers
      let headers = {
        "X-RapidAPI-Key": "54cc4f0d93mshc9c21b85395bc45p1555e7jsn7ee6960662f1",
        "X-RapidAPI-Host": "world-history-timeline.p.rapidapi.com",
      };
      options.headers = headers;
    },
    query: { year: selected_year },
    pick: ["results"],
    watch: [selected_year],
    key: "historical_events-" + selected_year.value,
    refetch: true,
  }
);

function generateYears() {
  const startYear = 1900;
  const endYear = 2000;

  for (let year = startYear; year <= endYear; year++) {
    years.value.push(year.toString());
  }
}

generateYears();

function copyToClipboard(value) {
  // Create a textarea element to hold the text to be copied
  const textArea = document.createElement("textarea");
  textArea.value = value; // Replace with the text you want to copy
  clipboard.value = value;

  // Append the textarea to the document
  document.body.appendChild(textArea);

  // Select the text in the textarea
  textArea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the textarea from the document
  document.body.removeChild(textArea);

  // Optionally, you can show a success message to the user
  // alert("Link copied to clipboard!");
  showToast();
}

function showToast() {
  show_toast.value = true;

  // Hide the toast after a certain duration (e.g., 3000 milliseconds)
  setTimeout(() => {
    show_toast.value = false;
  }, 3000);
}
</script>

<template>
  <div class="p-10 flex flex-col space-y-10">
    <div class="">
      <div class="flex flex-row">
        <div class="md:w-1/4 w-full">
          <label
            for="years"
            class="block text-sm font-medium leading-6 dark:text-gray-200"
            >Select A Year</label
          >
          <div class="mt-2">
            <select
              v-model="selected_year"
              name="years"
              id="years"
              class="block w-full rounded-md border py-3 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-200"
            >
              <option v-for="(year, index) in years" :key="index">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <!-- <button
          class="rounded-md mt-4 bg-white border hover:text-white border-primary-500 text-primary-500 dark:bg-primary-600 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Take me back in time

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button> -->
      </div>
    </div>

    <hr />
    <div class="flex flex-col space-y-5">
      <div>
        <h2 class="text-2xl font-bold dark:text-white">
          Stuff that happened in {{ selected_year }}
        </h2>
      </div>

      <span v-if="loading" class="flex justify-center h-full">
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="60"
          color="#3e4e41"
        />
      </span>
      <div class="grid md:grid-cols-3 gap-5" v-else>
        <div
          class="border dark:border-slate-100 border-primary-500 p-10 hover:shadow-md dark:hover:shadow-slate-500 hover:rounded-lg rounded transition ease-in-out delay-50 flex flex-col items-stretch"
          v-for="historical_event in historical_events.results"
          :key="historical_event.id"
        >
          <p class="text-lg dark:text-gray-200">{{ historical_event.Event }}</p>

          <div class="flex flex-row justify-end self-end">
            <button
              v-if="clipboard != historical_event.Event"
              @click="copyToClipboard(historical_event.Event)"
              class="border dark:border-gray-300 rounded-full p-2 border-black hover:bg-green-200 hover:border-green-300 transition ease-in-out delay-50 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 dark:stroke-slate-100 group-hover:stroke-black"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </button>

            <button
              v-else
              class="border dark:border-gray-300 rounded-full p-2 border-black bg-green-200 transition ease-in-out delay-50 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 fill-green-300"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="show_toast"
    class="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-4 rounded shadow"
  >
    Copied to clipboard
  </div>
</template>

<style scoped></style>
