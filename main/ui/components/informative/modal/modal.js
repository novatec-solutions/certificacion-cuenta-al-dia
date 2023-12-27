Component({
  mixins: [],
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    closeModal(data) {
      this.props.onConfirm(data.target.dataset.item)
    }
  },
});
