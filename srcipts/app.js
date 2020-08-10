// New contact component
Vue.component('new-contact', {
    props: {
        handleOnSubmitContcat: {
            type: Function,
            required: true
        }
    },
    template: `
        <div class="new-contact">
            <form v-on:submit.prevent="submitNewContact">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input 
                                class="form-control" 
                                placeholder="Full Name"
                                type="text" 
                                v-model="name"
                                @input="handleChangeName"
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input 
                                class="form-control" 
                                type="text"
                                v-model="mobile"
                                placeholder="Mobile Number" 
                                @input="handleChangeMobile"
                            />
                        </div>
                    </div>
                    <div class="col-md-12 text-center">
                        <button 
                            v-on:click="submitNewContact" 
                            class="button button--in-bd"
                        >
                            Add New
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
    data: function () {
        return {
            name: null,
            mobile: null,
        }
    },
    computed: {

    },
    methods: {
        handleChangeName: function (e) {
            const name = e.target.value;
            this.name = name
        },
        handleChangeMobile: function (e) {
            const mobile = e.target.value;
            this.mobile = mobile
        },
        submitNewContact: function (e) {
            e.preventDefault();
            const name = this.name;
            const mobile = this.mobile;

            this.handleOnSubmitContcat(name, mobile)
            this.name = null;
            this.mobile = null;
        }
    }
});

// Avatar component
Vue.component('user-avatar', {
    props: {
        url: {
            type: String,
            default: '/img/profile.png'
        },
        name: {
            type: String,
            default: 'Username',
            required: true
        }
    },
    template: `<img class="avatar" v-bind:src="url" v-bind:alt="name" />`
});

// Contact item component
Vue.component('contact-item', {
    props: {
        contact: {
            type: Object,
            required: true
        },
        handleRemoveContact: {
            type: Function,
            required: true
        }
    },
    template: `
        <div class="contact-item">
            <div class="contact-item__avatar">
                <user-avatar :name="contact.name"></user-avatar>
            </div>
            <div class="contact-item__info">
                <h3 class="contact-item__info__name">{{ contact.name }}</h3>
                <p class="contact-item__info__mobile">{{ contact.mobile }}</p>
                <button v-on:click="handleRemoveContact(contact.id)" class="button button--tiny">Remove</button>
            </div>
        </div>
    `
});

// Contact list component
Vue.component('contact-list', {
    props: {
        contacts: {
            type: Array,
            required: true
        },
        handleRemoveContact: {
            type: Function,
            required: true
        },
    },
    template: `
        <div class="contact-list">
            <contact-item
                v-for="contact in contacts"
                :key="contact.id"
                :contact="contact"
                :handleRemoveContact="handleRemoveContact"
            ></contact-item>
        </div>
    `
});

// Header Component
Vue.component('app-header', {
    props: {
        title: {
            type: String,
            default: 'My Contacts Book'
        },
        subtitle: {
            type: String,
            required: false
        },
        handleVisibility: {
            type: Function
        }
    },
    template: `
        <div class="header">
            <h1 class="header__title">{{ title }}</h1>
            <h4 class="header__subtitle">{{ subtitle }}</h4>
            <button class="button button--in-bg" v-on:click="handleVisibility">New Contact</button>
        </div>
    `
});

// App component
Vue.component('app', {
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <app-header 
                        subtitle="Save Your Mobile Contacts"
                        :handleVisibility="handleVisibility"
                    ></app-header>
                    <new-contact 
                        v-if="visibility"
                        :handleOnSubmitContcat="handleOnSubmitContcat"
                    ></new-contact>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <contact-list 
                        v-bind:contacts="contacts"
                        :handleRemoveContact="handleRemoveContact"
                    >
                    </contact-list>
                </div>
            </div>
        </div>
    `,
    data: function () {
        return {
            contacts: [
                { id: uuidv4(), name: 'Harry Potter', mobile: '+4587863214' },
                { id: uuidv4(), name: 'Jhon Deo', mobile: '+4587863214' },
                { id: uuidv4(), name: 'Will Smith', mobile: '+4587863214' },
            ],
            visibility: false
        }
    },
    methods: {
        handleVisibility: function () {
            //console.log(this.visibility = !this.visibility)
            this.visibility = !this.visibility
        },
        handleRemoveContact: function (removeId) {
            this.contacts = this.contacts.filter(({ id }) => id !== removeId)
        },
        handleOnSubmitContcat: function (name, mobile) {
            this.contacts = this.contacts.concat({ id: uuidv4(), name: name, mobile: mobile })
        }
    }
});

new Vue({ el: '#root', template: `<app></app>` })