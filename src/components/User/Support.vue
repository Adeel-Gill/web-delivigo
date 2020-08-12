<template>
    <div class="container--fluid">
        <div class="col-12 col-md-9 p-0">
            <div class="head-sec" v-if="isChat">
                <h1>Hello There</h1>
                <p>Hello there and welcome to DeliviGo support
                    We are here to help!</p>
                <div class="line"></div>
            </div>
            <div class="col-11 col-sm-8 mx-auto p-0">
            <div class="conversation" v-if="isChat">
                <h2>Start a new conversation</h2>
                <p>Typically replies in 10 mint</p>

                <div class="agent-pic  pl-md-5 pl-1">
                        <div class="circle">
                        </div>
                        <div class="circle move">
                        </div>
                        <div class="circle move2">
                        </div>
                        <div class="circle move3">
                        </div>
                        <div class="circle move4">
                        </div>
                    </div>

                    <div class="buttons w-100">
                        <div class="new my-3">
                            <button class="btn btn-outline-light" @click="establishConnection()">New Conversation</button>
                        </div>
                        <div class="prev my-3">
                            <button class="btn text-light">See Previous</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-sec" v-if="!isChat">
                <div class="col-md-12 chat">
                    <div class="card">
                        <div class="card-header msg_head">
                            <div class="d-flex bd-highlight">
                                <div class="img_cont">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                                    <span class="online_icon"></span>
                                </div>
                                <div class="user_info">
                                    <span>Chat with {{name}} </span>
                                    <p>{{allMessages.length}} Messages</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body msg_card_body">
                            <div v-for="(message, index) in allMessages" :key="index">
                                <div v-if="message.type === 'r'">
                                    <div class="d-flex justify-content-start mb-4">
                                        <div class="img_cont_msg">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
                                        </div>
                                        <div class="msg_cotainer">
                                            {{message.message}}
                                            <span class="msg_time">9:00 AM, Today</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end mb-4" v-else>
                                    <div class="msg_cotainer_send">
                                        {{message.message}}
                                        <span class="msg_time_send">9:05 AM, Today</span>
                                    </div>
                                    <div class="img_cont_msg">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="input-group">
                                <div class="input-group-append">
                                    <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i><i class="far fa-image"></i></span>
                                </div>
                                <textarea name="" v-model="text" class="form-control type_msg" placeholder="Type your message..."></textarea>
                                <div class="input-group-append">
                                    <span class="input-group-text send_btn"><i class="fas fa-location-arrow" @click="sendMessage"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';
import { hubConnection } from 'signalr-no-jquery';
import 'jquery';
import 'signalr';
    export default {
        name: "Support",
        data() {
            return {
                connection:  null,
                proxy: null,
                text: '',
                id: 0,
                name: '',
                isChat: true,
                officerName: '',
                allMessages: [],
                sentMessage: {
                    'id': '',
                    'type': 's',
                    'name': '',
                    'message': ''
                },
                receiveMessage: {
                    'id': '',
                    'type': 'r',
                    'name': '',
                    'message': ''
                },
            }
        },
        created() {
            
        },
        mounted() {
        // this.establishConnection(); 
        // this.proxy.on('sendPrivateMessage', (id, name, userType, message) => {
        //     console.log(id,name,userType,message);
        // })
        // this.sendPrivateMessage(id, name, userType, message));
            // this.establishConnection(); 
        },
        methods: {
            async startConnection() {
                this.proxy.invoke('Connect',localStorage.getItem('name'),localStorage.getItem('id'), 'customer').then(response => {
                        this.isChat = false;
                        this.showNotification('success', 'Success', 'Connection established successfully!');
                        localStorage.setItem('isConnection', 'true');
                    }).catch(error => {
                        this.showNotification('error', 'Error Connect', error);
                });
            },
            resetSend() {
                this.sentMessage.name = '';
                this.sentMessage.message = '';
            },
            resetReceive() {
                this.receiveMessage.name = '';
                this.receiveMessage.message = '';
                this.receiveMessage.id = '';
            },
            sendMessage() {
                
                console.log('sending message', this.text);
                if(!this.id) {
                    this.id = 0;
                }
                this.proxy.invoke('SendPrivateMessage', this.id, 'customerservice','customer', this.text).then(response => {
                    this.sentMessage.message = this.text;
                    this.sentMessage.name = localStorage.getItem('name');
                    this.allMessages.push({
                        'name': localStorage.getItem('name'),
                        'message': this.text,
                        'type': 's'
                    });
                    this.text = '';
                    console.log(this.allMessages);
                    // this.resetSend();
                }).catch(error => {
                    this.showNotification('error', 'Send Error', error);
                })
            },
            async establishConnection() {
                console.log('starting connection');
                try {
                    // debugger;
                    
                   this.connection =  $.hubConnection('https://www.delivigo.com');
                   this.proxy = this.connection.createHubProxy('requestLog');
                   this.proxy.on('sendPrivateMessage', (id, name, userType, message) => {
                        if(userType === 'customerservice') {
                            this.allMessages.push({
                                'id': id,
                                'type': 'r',
                                'name': name,
                                'message': message
                            });
                            this.id = id;
                            this.name = name;
                        }
                            console.log(id,name,userType,message);
                    });
                   this.connection.start({ withCredentials: false }).done(async response => {
                       console.log(response);
                       await this.startConnection();
                    //    this.showNotification('success', 'Success', 'Connection established successfully!');
                   }).catch(error => {
                       console.log(error);
                       this.showNotification('error', 'Error Start', error);
                   })
                    // this.connection = new HubConnectionBuilder().configureLogging(LogLevel.Information)
                    // .withUrl('https://www.foodizza.com/requestLog', {
                    //     skipNegotiation: true,
                    //     transport: HttpTransportType.WebSockets
                    // }).build();
                    // this.connection.start().catch(error => {
                    //     this.showNotification('error', 'Error Start', error);
                    // });
                    
                } catch(err) {
                    console.log(err);
                    this.showNotification('error', 'Error', err);
                }
            },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            }
        }
    }
</script>

<style scoped>
.head-sec{
    background-color: #343d5e;
    color: white;
    padding: 10px 50px 200px 50px;
}
    .conversation{
        background-color: rgba(86,94,255, 0.9);
        border-radius: 10px;
        color: white;
        position: relative;
        top:-140px;
        padding: 10px 20px;
        text-align: center;
    }
    .line{
        border: 1px solid white;
        width: 100%;
    }
    .circle{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid white;
        display: inline-block;
        margin: 10px 0px;
        background-color: rgb(86,94,255);
        position: relative;
    }
    .move{
        left: -15px;
    }
    .move2{
        left: -30px;
    }
    .move3{
        left: -45px;
    }
    .move4{
        left: -60px;
    }
    .new button{
        width: 50%;
        border-radius: 10px;
    }
    .prev button{
        width: 50%;
        border-radius: 10px;
    }
    .prev button:hover{
        border: 1px solid white;
    }
    .chat-sec{
        /*background-color: #CECECF;*/
        /*height: 400px;*/
        position: relative;
        /*top: -50px;*/
    }
    .agent-pic{
        /*margin-right: 30px;*/
        /*float: right;*/
        position: relative;
        right: -20px;
    }





/*body,html{
    height: 100%;
    margin: 0;
    background: #7F7FD5;
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
}*/

.chat{
    margin-top: auto;
    margin-bottom: auto;

}
.card{
    height: 500px;
    border-radius: 15px !important;
    /*background-color: rgba(0,0,0,0.4) !important;*/
    /*background: #7F7FD5;
    background: -webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);*/

    background: #0f0c29;
    background: -webkit-linear-gradient(to right, #0f0c29, #302b63, #24243e);
    background: linear-gradient(to right, #0f0c29, #302b63, #24243e);

    /*background: #141E30;
    background: -webkit-linear-gradient(to right, #243B55, #141E30);
    background: linear-gradient(to right, #243B55, #141E30);*/

    /*background: #606c88;
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
    background: linear-gradient(to right, #3f4c6b, #606c88); */

    /*background: #000046;
    background: -webkit-linear-gradient(to left, #1CB5E0, #000046);
    background: linear-gradient(to left, #1CB5E0, #000046);*/

    /*background-image: linear-gradient( 179.6deg,  rgba(0,19,26,1) -4.9%, rgba(0,77,105,1) 108.4% );*/


}

.msg_card_body{
    overflow-y: auto;
}



.msg_card_body::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

.msg_card_body::-webkit-scrollbar
{
    width: 10px;
    background-color: #F5F5F5;
}

.msg_card_body::-webkit-scrollbar-thumb
{
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg,
    rgba(255, 255, 255, .2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, .2) 50%,
    rgba(255, 255, 255, .2) 75%,
    transparent 75%,
    transparent)
}


.card-header{
    border-radius: 15px 15px 0 0 !important;
    border-bottom: 0 !important;
}
.card-footer{
    border-radius: 0 0 15px 15px !important;
    border-top: 0 !important;
}
.type_msg{
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color:white !important;
    height: 60px !important;
    overflow-y: auto;
}
.type_msg:focus{
    box-shadow:none !important;
    outline:0px !important;
}
.attach_btn{
    border-radius: 15px 0 0 15px !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
}
.attach_btn i {
    font-size: 20px;
    cursor: pointer;
}
.attach_btn i:first-child {
    padding-right: 15px;
}
.send_btn{
    border-radius: 0 15px 15px 0 !important;
    background-color: rgba(0,0,0,0.3) !important;
    border:0 !important;
    color: white !important;
    cursor: pointer;
    font-size: 20px;
    padding-right: 20px;
    padding-left: 20px;
}

.contacts{
    list-style: none;
    padding: 0;
}
.contacts li{
    width: 100% !important;
    padding: 5px 10px;
    margin-bottom: 15px !important;
}
.user_img{
    height: 70px;
    width: 70px;
    border:1.5px solid #f5f6fa;

}
.user_img_msg{
    height: 40px;
    width: 40px;
    border:1.5px solid #f5f6fa;

}
.img_cont{
    position: relative;
    height: 70px;
    width: 70px;
}
.img_cont_msg{
    height: 40px;
    width: 40px;
}
.online_icon{
    position: absolute;
    height: 15px;
    width:15px;
    background-color: #4cd137;
    border-radius: 50%;
    bottom: 0.2em;
    right: 0.4em;
    border:1.5px solid white;
}
.offline{
    background-color: #c23616 !important;
}
.user_info{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 15px;
}
.user_info span{
    font-size: 20px;
    color: white;
}
.user_info p{
    font-size: 10px;
    color: rgba(255,255,255,0.6);
}
.video_cam{
    margin-left: 50px;
    margin-top: 5px;
}
.video_cam span{
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
}
.msg_cotainer{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 25px;
    background-color: #82ccdd;
    padding: 10px;
    position: relative;
}
.msg_cotainer_send{
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 25px;
    background-color: #78e08f;
    padding: 10px;
    position: relative;
}
.msg_time{
    position: absolute;
    left: 0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
}
.msg_time_send{
    position: absolute;
    right:0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
}
.msg_head{
    position: relative;
}
#action_menu_btn{
    position: absolute;
    right: 10px;
    top: 10px;
    color: white;
    cursor: pointer;
    font-size: 20px;
}
.action_menu{
    z-index: 1;
    position: absolute;
    padding: 15px 0;
    background-color: rgba(0,0,0,0.5);
    color: white;
    border-radius: 15px;
    top: 30px;
    right: 15px;
    display: none;
}
.action_menu ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
.action_menu ul li{
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 5px;
}
.action_menu ul li i{
    padding-right: 10px;

}
.action_menu ul li:hover{
    cursor: pointer;
    background-color: rgba(0,0,0,0.2);
}
@media(max-width: 576px){
    .contacts_card{
        margin-bottom: 15px !important;
    }
}




@media (min-width: 960px){
    .col-md-9{
        max-width: 78%;
    }
}
    @media screen and (max-width: 400px) {

    }

</style>
