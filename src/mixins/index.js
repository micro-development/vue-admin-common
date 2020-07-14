/**
 * @author yaimeet
 * @date 2020/2/7
 * @Description
 */
export default {
    data () {
        return {
            isStoreSubscribe: false,
            projectItem: null
        }
    },
    async created () {
        if (this.$store) {
            if (!this.isStoreSubscribe) {
                this.isStoreSubscribe = true
                this.$store.subscribe((mutation, state) => {
                    if (mutation.type === 'setCurrentProject' && this[mutation.type] && typeof this[mutation.type] === 'function') {
                        // this.$log.echo(mutation.type, 'storeSubscribeSetCurrentProject mutation.type', 'trace')
                        // this.$log.echo({
                        //     mutation,
                        //     state
                        // }, 'storeSubscribeSetCurrentProject', 'log')
                        this.projectItem = mutation.payload
                        this[mutation.type]({
                            payload: mutation.payload,
                            state
                        })
                    }
                })
            }
        }
    },
    methods: {}
}
