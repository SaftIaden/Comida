<script>
export default {
  data() {
    return {
      swipePosition: 0,
      startX: 0,
      currentX: 0,
      activeIndex: null,
      cards: [
        {
          id: '0fNYJMvRcSBEC4zK3SClpK',
          name: 'Weisse Orchideen',
          artist: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/6h1s4i4XKIYv4ErDelLDN0',
              },
              href: 'https://api.spotify.com/v1/artists/6h1s4i4XKIYv4ErDelLDN0',
              id: '6h1s4i4XKIYv4ErDelLDN0',
              name: 'Samra',
              type: 'artist',
              uri: 'spotify:artist:6h1s4i4XKIYv4ErDelLDN0',
            },
          ],
          type: 'track',
          uri: 'spotify:track:0fNYJMvRcSBEC4zK3SClpK',
          duration_ms: 177208,
          explicit: false,
          href: 'https://api.spotify.com/v1/tracks/0fNYJMvRcSBEC4zK3SClpK',
          preview_url:
            'https://p.scdn.co/mp3-preview/4d9f6e6d9bdbbf553e3527d80fa306896b29d1e4?cid=c2a4939204764f59b6285efe9e4ee182',
          external_urls: {
            spotify: 'https://open.spotify.com/track/0fNYJMvRcSBEC4zK3SClpK',
          },
          popularity: 69,
          addedAt: '2023-01-26T15:16:34.478Z',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b27351735be3d846e84893d7101e',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e0251735be3d846e84893d7101e',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d0000485151735be3d846e84893d7101e',
              width: 64,
            },
          ],
        },
        {
          id: '6zJejIfVYLgjud3lTk4DLB',
          name: 'SNAP',
          artist: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/46xBNx0j6cwY6sD9LgMTm1',
              },
              href: 'https://api.spotify.com/v1/artists/46xBNx0j6cwY6sD9LgMTm1',
              id: '46xBNx0j6cwY6sD9LgMTm1',
              name: 'Rosa Linn',
              type: 'artist',
              uri: 'spotify:artist:46xBNx0j6cwY6sD9LgMTm1',
            },
          ],
          type: 'track',
          uri: 'spotify:track:6zJejIfVYLgjud3lTk4DLB',
          duration_ms: 179551,
          explicit: false,
          href: 'https://api.spotify.com/v1/tracks/6zJejIfVYLgjud3lTk4DLB',
          preview_url: null,
          external_urls: {
            spotify: 'https://open.spotify.com/track/6zJejIfVYLgjud3lTk4DLB',
          },
          popularity: 39,
          addedAt: '2023-01-26T15:16:34.703Z',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b273c009b22a08eee835ce3efeb9',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e02c009b22a08eee835ce3efeb9',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d00004851c009b22a08eee835ce3efeb9',
              width: 64,
            },
          ],
        },
      ],
    };
  },
  methods: {
    text_truncate(str, length, ending) {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    },
    startSwipe(index) {
      this.activeIndex = index;
      this.startX = event.touches[0].clientX;
    },
    moveSwipe(event) {
      this.currentX = event.touches[0].clientX;
      this.swipePosition = this.currentX - this.startX;
    },
    endSwipe(index) {
      const threshold = 150;
      if (Math.abs(this.swipePosition) > threshold) {
        if (this.swipePosition > 0) {
          this.swipeRight(index);
        } else {
          this.swipeLeft(index);
        }
      } else {
        this.resetSwipe();
      }
    },
    swipeRight(index) {
      console.log('Liked');
      this.cards.splice(index, 1);
      this.resetSwipe();
    },
    swipeLeft(index) {
      console.log('Noped');
      this.cards.splice(index, 1);
      this.resetSwipe();
    },

    swipeUp(index) {
      console.log('Neutral');
      this.cards.splice(index, 1);
      this.resetSwipe();
    },

    resetSwipe() {
      this.swipePosition = 0;
      this.activeIndex = null;
    },
  },
};
</script>
<template>
  <div class="">
    <transition-group class="" name="card-slide" tag="div" v-show="show">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="absolute card bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] rounded-[25px] shadow-white"
        @touchstart="startSwipe(index)"
        @touchmove="moveSwipe"
        @touchend="endSwipe(index)"
        :style="{
          transform: `translateX(${
            index === activeIndex ? swipePosition : 0
          }px)`,
          height: `667px`,
        }"
      >
        <div class="p-3">
          <img
            class="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            :src="`${card.images[0].url}`"
            alt=""
            style="border-radius: 15px"
          />
        </div>

        <div class="text-center bgCh" style="transform: translateY(-106%)">
          <div class="p-5 text-black">
            <p class="text-5xl font-bold capitalize">
              {{ text_truncate(card.name, 19) }}
            </p>
            <p class="text-4xl mt-4">
              Artist:
              <strong class="text-bold">{{ card.artist[0].name }}</strong>
            </p>
            <p class="text-4xl mt-2">
              Duration:
              <strong
                >{{
                  (Math.floor(card.duration_ms) / 60000).toFixed(2)
                }}
                Min</strong
              >
            </p>
          </div>
        </div>

        <div
          class="flex justify-center items-center"
          style="transform: translateY(-120%)"
        >
          <div class="">
            <button @click="swipeLeft(index)" class="text-6xl"></button>
            <button @click="swipeUp(index)" class="text-6xl"></button>
            <button @click="swipeRight(index)" class="text-6xl"></button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>