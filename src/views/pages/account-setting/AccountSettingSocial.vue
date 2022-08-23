<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="LinkIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              {{$t('Social Links')}}
            </h4>
          </div>
        </b-col>

        <!-- twitter -->
        <b-col md="6">
          <b-form-group
            label-for="account-twitter"
            :label="$t('Twitter')"
          >
            <b-form-input
              id="account-twitter"
              v-model="localOptions.socialLinks.twitter"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!--/ twitter -->

        <!-- facebook -->
        <b-col md="6">
          <b-form-group
            label-for="account-facebook"
            :label="$t('Facebook')"
          >
            <b-form-input
              id="account-facebook"
              v-model="localOptions.socialLinks.facebook"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!--/ facebook -->

        <!-- google+ -->
        <b-col md="6">
          <b-form-group
            label-for="account-google"
            :label="$t('Google+')"
          >
            <b-form-input
              id="account-google"
              v-model="localOptions.socialLinks.google"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!--/ google+ -->

        <!-- linkedin -->
        <b-col md="6">
          <b-form-group
            label-for="account-linkedin"
            :label="$t('LinkedIn')"
          >
            <b-form-input
              id="account-linkedin"
              v-model="localOptions.socialLinks.linkedIn"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!-- linkedin -->

        <!-- instagram -->
        <b-col md="6">
          <b-form-group
            :label="$t('Instagram')"
            label-for="account-instagram"
          >
            <b-form-input
              id="account-instagram"
              v-model="localOptions.socialLinks.instagram"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!--/ instagram -->

        <!-- quora -->
        <b-col md="6">
          <b-form-group
            label-for="account-quora"
            :label="$t('Quora')"
          >
            <b-form-input
              id="account-quora"
              v-model="localOptions.socialLinks.quora"
              :placeholder="$t('Add link')"
            />
          </b-form-group>
        </b-col>
        <!--/ quora -->

        <b-col cols="12">
          <hr class="my-2">
        </b-col>

        <!-- Profile Connections -->
        <b-col
          cols="12"
          class="mt-1"
        >
          <div class="d-flex align-items-center mb-3">
            <feather-icon
              icon="UserIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              {{$t('Profile Connections')}}
            </h4>
          </div>
          <b-row class="text-center">
            <!-- twitter profile -->
            <b-col
              md="3"
              cols="6"
              class="mb-1"
            >
              <b-card-text class="font-weight-bold">
                {{$t('Your Twitter')}}
              </b-card-text>
              <div class="mb-1">
                <b-avatar
                  size="40"
                  :src="localOptions.connections.twitter.profileImg"
                />
              </div>
              <b-card-text class="mb-0">
                @{{ localOptions.connections.twitter.id }}
              </b-card-text>
              <b-link>
                {{('Disconnect')}}
              </b-link>
            </b-col>
            <!--/ twitter profile -->

            <!-- facebook connect button -->
            <b-col
              md="3"
              cols="6"
              class="mb-1"
            >
              <b-card-text class="font-weight-bold mb-2">
                {{$t('Your Facebook')}}
              </b-card-text>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
              >
                {{$t('Connect')}}
              </b-button>
            </b-col>
            <!--/ facebook connect button -->

            <!-- google profile -->
            <b-col
              md="3"
              cols="6"
              class="mb-1"
            >
              <b-card-text class="font-weight-bold">
                {{$t('Your Google')}}
              </b-card-text>
              <div class="mb-1">
                <b-avatar
                  size="40"
                  :src="localOptions.connections.google.profileImg"
                />
              </div>
              <b-card-text class="mb-0">
                @{{ localOptions.connections.google.id }}
              </b-card-text>
              <b-link>
                {{('Disconnect')}}
              </b-link>
            </b-col>
            <!--/ google profile -->

            <!-- github connect -->
            <b-col
              md="3"
              cols="6"
              class="mb-1"
            >
              <b-card-text class="font-weight-bold mb-2">
                {{$t('Your GitHub')}}
              </b-card-text>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                variant="outline-primary"
              >
                {{$t('Connect')}}
              </b-button>
            </b-col>
            <!--/ github connect -->
          </b-row>
        </b-col>

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
          >
            {{$t('Save changes')}}
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1 ml-25"
            variant="outline-secondary"
            @click.prevent="resetForm"
            @click="reset_all"
          >
            {{$t('Cancel')}}
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BCardText, BLink, BAvatar,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BCardText,
    BLink,
    BAvatar,
  },
  directives: {
    Ripple,
  },
  props: {
    socialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localOptions: JSON.parse(JSON.stringify(this.socialData)),

    }
  },
  methods: {
    reset_all(){
      console.log("Salom dunyo",this.socialData)
      console.log("localOptions",this.localOptions)

    },
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.socialData))
    },
  },
}
</script>
