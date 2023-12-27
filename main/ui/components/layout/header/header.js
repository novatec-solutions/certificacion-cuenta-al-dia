Component({
  mixins: [],
  data: {
    navegationIcon: [
      {
        img: 'FlechaAtras.svg',
        text: 'Return',
        type: 'return'
      }
    ]
  },
   /**
   * Propiedades del componente.
   * @type {object}
   * @property {string} orden_image - Esta propiedad indica el orden de ubicación de la imagen
   * @property {string} orden_text - Esta propiedad indica el orden de ubicación del texto
   * @property {boolean} visible_image - Esta propiedad determina si se muestra el contenido
   * @property {boolean} visible_text - Indica si el texto es visible.
   * @property {boolean} visible_image_left - Esta propiedad determina si se muestra el contenido de la sección izquierda
   * @property {string} logo_header - Esta propiedad indica la ruta de ubicación del la imagen
   * @property {string} title_header - Esta propiedad indica el contenido de texto de la imagen
   */
  props: {
    orden_image: '',
    orden_text: '',
    visible_image: false,
    visible_text: true,
    prev_page: '',
    logo_header: '/main/ui/assets/image/LogoClaroPay.svg',
    return_header: '/main/ui/assets/image/FlechaAtras.svg',
    title_header: '',
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    navigateBack(){
      my.reLaunch({
        url: this.props.prev_page
      })
    }
  },
  returnIcon({target}){
    let data = target.dataset.item

    if(data.type == 'efectivo'){
      my.reLaunch({
        url: '/main/ui/pages/chargingPoints/chargingPoints'
      })
    }
  },
  onLoad() {},
});
