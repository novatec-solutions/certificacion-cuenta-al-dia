Component({
  mixins: [],
  data: {
  },
  props: {
    showError:'',
    mensaje: '',
    onAceptError:function() {},
    onCloseError: function(){},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    acceptError(){ 
      my.redirectTo({url:'/main/ui/pages/home/home'})
      this.props.onAceptError()
    },
    closeError(){
       my.redirectTo({url:'/main/ui/pages/home/home'})
       this.props.onCloseError()
    }
  },
});
