<script lang="ts">
    import {StylesManager} from '@beyond-js/widgets/render/ts';

    export let styles: StylesManager;
</script>

{#each [...styles.resources] as url}
    <link href="{url}" rel="stylesheet" on:load={url => {styles.onloaded(url)}}/>
{/each}
