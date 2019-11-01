<template>
    <div>
        <p>{{foo}}</p>
        <button @click="foo = 'baz'">change</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            foo: 'bar'
        }
    },
    methods: {
      
    }
}
</script>

<style>

</style>
