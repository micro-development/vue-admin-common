<template>
    <component-container>
        <it-simple-dropdown
            @onChangeDropdown="onChangeDropdown"
            :config="config"
            :item-prop="itemProp"
            :dropdown-list="dropdownList"
            class="simple-dropdown"
            slot="content"></it-simple-dropdown>
    </component-container>
</template>

<script>
    export default {
        name: 'example-it-simple-dropdown',
        data () {
            return {
                config: {
                    closeAutoSettingValue: false, // 当这个为true的时候，改变下拉框，不会自动更新文本，需要自动在下拉框改变事件更新
                    defaultText: '选择项目'
                },
                itemProp: {
                    label: 'name',
                    value: 'uuid'
                },
                dropdownList: []
            }
        },
        mounted () {
            this.test()
        },
        methods: {
            onChangeDropdown ({ value }) {
                // this.$log.echo(value, 'onChangeDropdown value', 'log')
                if (this.config.closeAutoSettingValue === true) {
                    this.$log.echo('组件内部不会自动更新文本，需要手动更新', 'onChangeDropdown value', 'log')
                    this.config.defaultText = value.name
                } else {
                    this.$log.echo('组件内部自动更新文本', 'onChangeDropdown value', 'log')
                }
            },
            test () {
                for (let i = 1; i < 20; i++) {
                    this.dropdownList.push({
                        name: `项目名称 ${i}`,
                        uuid: i
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .simple-dropdown{
        margin: 20px;
    }
</style>
