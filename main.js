
document.addEventListener('DOMContentLoaded', function () {
    Vue.use(VueMaterial.default)


// function checkKeycode(event) {
//     // handling Internet Explorer stupidity with window.event
//     // @see http://stackoverflow.com/a/3985882/517705
//     var keyDownEvent = event || window.event,
//     keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

//     console.log(keycode);
//     // print_arrow_key(keycode);

//     return false;
// }

// document.onkeydown = checkKeycode;
    URL = window.URL || window.webkitURL;
    var gumStream;
    //stream from getUserMedia() 
    var rec;
    //Recorder.js object 
    var input;
    //MediaStreamAudioSourceNode we'll be recording 
    // shim for AudioContext when it's not avb. 
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext;
    
    // document.onkeydown=checkKey;
    
    Vue.component('msg-text', {
        props: ["name", "text", "id", "direction", "type"],

        template: `

        <div v-if="type == 'text'">
            <div id="msg-box" v-bind:style="{ textAlign: direction}">
                <div id="msg-heading"> {{name}} </div>
                <div v-html="text" id="msg-body"> {{text}} </div> 
            </div>
            
        </div>
        <div v-else-if="type == 'audio'">
            <div id="msg-box" v-bind:style="{ textAlign: direction}">
                <h3> Audio </h3>
                <md-button @click="playAudio(text)" class="md-icon-button">
                    <md-icon class="fa fa-play-circle"></md-icon>
                </md-button>
            </div>
        </div>

        `,
        methods: {
            playAudio(text) {
                console.log(text);
                if(text){
                    var audio = new Audio();
                    audio.src = text;
                    audio.play();
                }
                
            }

            
        }
    })


    new Vue({
        el: '#app',
        
        data: {
            name: "Anuroop",
            recording: false,
            friends: [
                {
                    id: 0,
                    name: "Vinesh",
                    messages: [

                        { id: 0, type: "text", data: "Hi Anuroop" },
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
            uplist(){
                if(this.current!=0){
                    this.current=(this.current-1)%3;
                }else{
                    this.current=3;
                }
            },
            downlist(){
                this.current=(this.current+1)%4;
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

            recordAudio(){
                /* Simple constraints object, for more advanced audio features see

                https://addpipe.com/blog/audio-constraints-getusermedia/ */

                

                if(!this.recording){
                    console.log("start");
                    this.recording = true;
                    var constraints = {
                        audio: true,
                        video: false
                    } 
                    /* Disable the record button until we get a success or fail from getUserMedia() */

                    // recordButton.disabled = true;
                    // stopButton.disabled = false;
                    // pauseButton.disabled = false

                    /* We're using the standard promise based getUserMedia()

                    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

                    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                        console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
                        /* assign to gumStream for later use */
                        gumStream = stream;
                        /* use the stream */
                       
                        input = audioContext.createMediaStreamSource(stream);
                        /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
                        rec = new Recorder(input, {
                            numChannels: 1
                        }) 
                        //start the recording process 
                        rec.record()
                        console.log("Recording started");
                    }).catch(function(err) {
                        //enable the record button if getUserMedia() fails 
                        // recordButton.disabled = false;
                        // stopButton.disabled = true;
                        // pauseButton.disabled = true
                    });
                } else {
                    this.recording = false;
                    this.stopRecording();
                }

                
                
            },

            stopRecording(){
                console.log("stop");

                rec.stop(); //stop microphone access 
                gumStream.getAudioTracks()[0].stop();
                //create the wav blob and pass it on to createDownloadLink 
                rec.exportWAV(this.createDownloadLink);
            },


            createDownloadLink(blob) {
                var url = URL.createObjectURL(blob);
                // var au = document.createElement('audio');
                // // var li = document.createElement('li');
                // var link = document.createElement('a');
                // //add controls to the <audio> element 
                // au.controls = true;
                // au.src = url;
                // //link the a element to the blob 
                // link.href = url;
                // link.download = new Date().toISOString() + '.wav';
                // link.innerHTML = link.download;

                this.friends[this.current].messages.push({id:-1, type: "audio", data: url})
                // console.log(link);
                //add the new audio and a elements to the li element 
                // li.appendChild(au);
                // li.appendChild(link);
                //add the li element to the ordered list 
                // recordingsList.appendChild(li);
            },
               
            
            sendMessage() {
                if(this.message!=""){
                    var str=this.message
                    var i=0
                    var index=str.indexOf(this.name)
                    var len=(this.name).length
                    if(index!=-1){
                        var b1='<b>';
                        var b2='</b>';
                        str=[str.slice(0,index-1), b1, str.slice(index-1,index+len),b2,str.slice(index+len)].join('');
                        
                    }

                    for(i=0;i<4;i++){
                        var index=str.indexOf(this.friends[i].name)
                        var len=(this.friends[i].name).length
                        if(index!=-1){
                            var b1='<b>';
                            var b2='</b>';
                            str=[str.slice(0,index-1), b1, str.slice(index-1,index+len),b2,str.slice(index+len)].join('');
                        }

                    }
                   

                    this.friends[this.current].messages.push({ id: -1, type: "text", data: str })
                    this.message =" ";
                }
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
