import App from './App.svelte';
import '@progress/kendo-theme-default';


const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;