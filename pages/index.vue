<script lang="ts" setup>
import { ref } from "vue";
let years: Ref<Array<string>> = ref([]);

const selected_year: Ref<String> = ref("1900");
const historical_events = ref([]);

function generateYears() {
  const startYear = 1900;
  const endYear = 2000;

  for (let year = startYear; year <= endYear; year++) {
    years.value.push(year.toString());
  }
}

generateYears();
getEvents();

async function getEvents() {
  const { results }: any = await $fetch(
    "https://world-history-timeline.p.rapidapi.com/History-By-Year",
    {
      query: {
        year: selected_year.value,
      },
      headers: {
        "X-RapidAPI-Key": "54cc4f0d93mshc9c21b85395bc45p1555e7jsn7ee6960662f1",
        "X-RapidAPI-Host": "world-history-timeline.p.rapidapi.com",
      },
    }
  );
  historical_events.value = results;
}
</script>

<template>
  <div class="p-10 flex flex-col space-y-10">
    <div class="flex flex-row justify-center text-4xl">Hotel Lister</div>
    <div class="overflow-x-scroll px-10">
      <div class="flex flex-row space-x-5">
        <div class="w-1/4">
          <label
            for="years"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Enter Year</label
          >
          <div class="mt-2">
            <select
              v-model="selected_year"
              name="years"
              id="years"
              class="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
            >
              <option v-for="(year, index) in years" :key="index" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <button
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
        </button>
      </div>
    </div>

    <hr />
    <div class="flex flex-col space-y-5">
      <div>
        <h2 class="text-2xl">Stuff That Happened in {{ selected_year }}</h2>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <div
          class="border border-primary-500 p-10 shadow-md rounded-md"
          v-for="historical_event in historical_events"
          :key="historical_event.id"
        >
          <p>{{ historical_event.Event }}</p>

          <div class="flex flex-row justify-end">
            <button class="border rounded-full p-2 border-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
