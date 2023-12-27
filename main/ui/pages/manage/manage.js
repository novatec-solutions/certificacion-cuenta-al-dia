const userViewModel = require('../../../domain/userViewModel');

Page({
  data: {
    showModal: false,
    modalIcon:'',
    modalTitle: '',
    modalMessage: '',
    modalSecondaryMessage: '',
    modalBtnPrimary: '',
    modalBtnOutline: '',
    isLoading: false,
    userEmail: '',
    homeAccountsAct: [],
    homeAccountsDeac: [],
    postAccountsAct: [],
    postAccountsDeac: [],
    accountsType3: [],
    accountsType2: [],
    typeAccountTab: '3',
    selectedDocument: false,
    accountSelected: '',
    urlWebView: 'data:application/pdf;base64,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pboFaL5qg+UClmXkE7siGWEqEkisi9jVOhHe22QR4ZjuhDljxfyOW8hYGzF+srwinDO/Z88T48OR8jtP4pX1PHJf7Ckt7zwlYedJOZXzpLaV86ScqrA4dt1ztzQOejD3OTdXY3DE/Kp4tjTVXsP94U3jRCr6fwB/DbapCmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iago8PC9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovVG9Vbmljb2RlIDUgMCBSCj4+CmVuZG9iago3IDAgb2JqCjw8L1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL1RvVW5pY29kZSA1IDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDYgMCBSCi9GMiA3IDAgUgo+PgovWE9iamVjdCA8PAo+Pgo+PgplbmRvYmoKOCAwIG9iago8PAovVGl0bGUgKENlcnRpZmljYWRvIEhvZ2FyKQovUHJvZHVjZXIgKEZQREYgMS44NCkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIzMTIxOTIyMDEwNykKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCj4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAxNDIwIDAwMDAwIG4gCjAwMDAwMDIxNzIgMDAwMDAgbiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDg3IDAwMDAwIG4gCjAwMDAwMDE1MDcgMDAwMDAgbiAKMDAwMDAwMTk0MSAwMDAwMCBuIAowMDAwMDAyMDU0IDAwMDAwIG4gCjAwMDAwMDIyODYgMDAwMDAgbiAKMDAwMDAwMjM4OSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDEwCi9Sb290IDkgMCBSCi9JbmZvIDggMCBSCj4+CnN0YXJ0eHJlZgoyNDM4CiUlRU9GCg=='
  },
  onReady() {
    if (my.canIUse('hideBackHome')) {
      my.hideBackHome();
    }
  },
  async onLoad() {
    this.setData({isLoading: true})
    const homeAccounts = await userViewModel.getHomeAccounts();
    if(homeAccounts.error === 0){
      homeAccounts.data.filter(x => {
        x.activate = false;
        x.state = Number(x.field13) > 0 ? 'Saldo pendiente' : 'Cuenta al día';
      })
      this.setData({
        accountsType3: homeAccounts.data,
        homeAccountsAct: homeAccounts.data.filter(x => x.status === 'A'),
        homeAccountsDeac: homeAccounts.data.filter(x => x.status === 'D'),
        isLoading: false

      })
    }
    const postpagoAccounts = await userViewModel.getPostpagoAccounts();
    if(postpagoAccounts.error === 0){
      postpagoAccounts.data.mora.filter(x => {
        x.activate = false;
        x.state = Number(x.statMora) === 0 ? 'Cuenta al día' : 'Saldo pendiente';
      })
      this.setData({
        accountsType2: postpagoAccounts.data.mora,
        postAccountsAct: postpagoAccounts.data.mora.filter(x => x.statLine === 'a'),
        postAccountsDeac: postpagoAccounts.data.mora.filter(x => x.statLine === 'd'),
        isLoading: false
      })
    }
  },
  async setAccountHomeSelect({target}) {
    const account = target.dataset.item.account;
    const homeAccounts = this.data.accountsType3;
    const arrayData = homeAccounts.map(item => {
      return {
        ...item,
        activate: item.account === account ? !item.activate : false
      };
    });    
    this.setData({
      accountSelected: {account: target.dataset.item.account},
      accountsType3: arrayData,
      homeAccountsAct: arrayData.filter(x => x.status === 'A'),
      homeAccountsDeac: arrayData.filter(x => x.status === 'D'),
      selectedDocument: !target.dataset.item.activate
    });
    
   if(!target.dataset.item.activate && target.dataset.item.state === "Saldo pendiente"){
    this.setData({
      selectedDocument: false,
      showModal: true,
      modalIcon: 'info',
      modalTitle: 'No es posible generar tu certificación',
      modalMessage: 'En este momento tienes un saldo pendiente.',
      modalSecondaryMessage: '48 horas después de realizar tu pago podrás generar tu solicitud nuevamente',
      modalBtnPrimary: 'Pagar',
      modalBtnOutline: 'Cerrar'
    });
   }    
  },
  async setAccountPostpagoSelect({target}) {
    const account = target.dataset.item.numberLine;
    const postPagoAccounts = this.data.accountsType2;
    const arrayData = postPagoAccounts.map(item => {
      return {
        ...item,
        activate: item.numberLine === account ? !item.activate : false
      };
    });

    this.setData({
      accountSelected: {account: target.dataset.item.numberLine, ref: target.dataset.item.refPago },
      accountsType2: arrayData,
      postAccountsAct: arrayData.filter(x => x.statLine === 'a'),
      postAccountsDeac: arrayData.filter(x => x.statLine === 'd'),
      selectedDocument: !target.dataset.item.activate
    })
    
   if(!target.dataset.item.activate && target.dataset.item.state === "Saldo pendiente"){
    this.setData({
      selectedDocument: false,
      showModal: true,
      modalIcon: 'info',
      modalTitle: 'No es posible generar tu certificación',
      modalMessage: 'En este momento tienes un saldo pendiente.',
      modalSecondaryMessage: '48 horas después de realizar tu pago podrás generar tu solicitud nuevamente',
      modalBtnPrimary: 'Pagar',
      modalBtnOutline: 'Cerrar'
    });
   }    
  },
  showError(error){
    this.setData({
      showModal: true,
      modalErrorMessage: error,
      modalBtnPrimary: 'Volver al inicio',
      isLoading: false
    });
  },
  closeModalPrimary() {
    this.setData({
      showModal: false,
      modalMessage: ''
    })
  },
  closeModalOutline(){
    this.setData({
      showModal: false,
      modalMessage: ''
    })
  },
  selectTab({target}) {
    this.setData({
      selectedDocument: false,
      typeAccountTab: target.dataset.tab,
      accountsType3: this.data.accountsType3.map(item => {return {...item,activate: false}}),
      accountsType2: this.data.accountsType2.map(item => {return {...item,activate: false}})
    })
  },
  async downloadCertificate(){
    const data = {
      typeCertification: this.data.typeAccountTab, //<- 1 equipos financiados, 2 movil, 3 fijos
      accountSelected: this.data.accountSelected
    }
  
    const getCertificate = await userViewModel.getCertificate(data);
    if(getCertificate.error === 0){
      const pdf = "data:application/pdf;base64," + getCertificate.data;
      my.downloadFile({
        url: pdf,
        success({ apFilePath }) {
          my.hideLoading();
          my.openDocument({
            filePath: apFilePath,
            fileType: 'pdf',
            success: (res) => {
              console.log('open document success')
              }
            })
          }
        });
    }    
  },
  sendCertificate(){}
});
