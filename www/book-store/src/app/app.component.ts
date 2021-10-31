import { ApplicationRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'book-app';
  // private readonly publicKey = 'BPcXCJkWsxLnvKJ0KO_5HFl8kr1h_G6S6ini3BJjFYLhyiKDn4sEHBCB7qRKtuInvWVcwOeQKZyqFcZadfs-Xos'
  // newsletterService: any;
  // constructor(
  //   private swPush: SwPush,
  //   private update :SwUpdate,
  //   private http : HttpClient,
  //   private appRef : ApplicationRef
  // ){
  //   this.updateClient();
  // }

  // ngOnInit(): void {
  //   this.pushSubscription();
  // }

  // updateClient(){
  //   if(!this.update.isEnabled){
  //     console.log('is not inable');
  //     return;
  //   }

  //   this.update.available.subscribe((e) => {
  //     console.log(`current` , e.current ,`available` , e.available);
  //     if(confirm('updata avaliable for the app please confirm')){
  //       this.update.activateUpdate().then(()=>location.reload());
  //     }
  //   })

  //   this.update.activated.subscribe((e) => {
  //     console.log(`current` , e.current ,`available` , e.previous)

  //   })
  // }


  // checkUpdate(){
  //   this.appRef.isStable.subscribe((isStable)=>{
  //     if(isStable){
  //       const timeIntervar = interval(2000);

  //       timeIntervar.subscribe(()=>{
  //         this.update.checkForUpdate().then(() => console.log('checked'));
  //         console.log('update checked')
  //       })
  //     }
  //   })
  // }

  
  // pushSubscription(){
  //   if(!this.swPush.isEnabled){
  //     console.log('notifacation is not enable');
  //     return;
  //   }
  //   this.swPush.requestSubscription({
  //     serverPublicKey: this.publicKey
  //   }).then((res)=>console.log(JSON.stringify(res)))
  //   .catch(error=>console.log(error))
  // }
}
