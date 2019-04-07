document.addEventListener('DOMContentLoaded', function () {
    Vue.use(VueMaterial.default)


    Vue.component('msg-text', {
        props: ["name", "text", "id", "direction"],

        template: '<div id="msg-box" v-bind:style="{ textAlign: direction}" > <div id="msg-heading"> {{name}} </div> <div id="msg-body"> {{text}} </div> </div>'
    })


    new Vue({
        el: '#app',
        data: {
            name: "Vinesh",
            friends: [
                {
                    id: 0,
                    name: "Anuroop",
                    messages: [

                        { id: 0, type: "text", data: "Hi Vinesh" },
                        { id: 0, type: "text", data: "Did You complete the homework" },
                        { id: -1, type: "text", data: "Yes Bro, The Lab assignmnet right?" },
                        { id: 0, type: "text", data: "Yeah, that one!" }

                    ]
                },
                {
                    id: 1,
                    name: "Mahaveer",
                    messages: [

                        { id: -1, type: "text", data: "Hey Mahaveer" },
                        { id: -1, type: "text", data: "Howz Life going on?" },
                        { id: 1, type: "text", data: "Everything is great bro" },
                        { id: 1, type: "text", data: "What about you?" }

                    ]
                },
                {
                    id: 2,
                    name: "Ravi",
                    messages: [

                        { id: 2, type: "text", data: "Hey Anuroop can we play a match today?" },
                        { id: 2, type: "text", data: "5:30 PM?" },
                        { id: -1, type: "text", data: "Yeah Bro no problem at all." },
                        { id: -1, type: "text", data: "I will be there." }

                    ]
                },
                {
                    id: 3,
                    name: "Rohith",
                    messages: [

                        { id: 3, type: "text", data: "Hey Anuroop I have a doubt" },
                        { id: 3, type: "text", data: "Are you free today?" },
                        { id: -1, type: "text", data: "Yeah bro what time?" }

                    ]
                }],
            current: 0,
            message: "",
            active: false,
            value: null
        },
        methods: {
            getColor(id) {
                if (id == this.current) {
                    return "#D8D8D8"
                } else {
                    return "#F5F5F5"
                }
            },
            selectFriend(id) {
                this.current = id;
            },
            nameFromId(id) {
                if (id == -1) {
                    return this.name
                } else {
                    return this.friends[id].name
                }
            },
            getAlignment(id) {
                if (id == -1)
                    return "left"
                else
                    return "right"
            },
            sendMessage() {
                this.friends[this.current].messages.push({ id: -1, type: "text", data: this.message })
                this.message = ""
            },
            triggerContact() {
                this.active = true;
            },
            addContact() {
                if (this.active) {
                    this.friends.push({
                        id: this.friends.length,
                        name: this.value,
                        messages: []
                    })
                }
                this.value = null;
                this.active = false;
            }
        }
    })

})
