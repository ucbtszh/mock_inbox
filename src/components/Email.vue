<template>
    <div>
        <p>{{ emailContent }}</p>
    </div>
</template>

<script>
export default {
    props: {
        emailContent: String
    }
};
</script>