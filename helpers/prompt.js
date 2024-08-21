// Creating a prompt that other files can import
//OBS! We need to install prompt sync to our package.json
import PromptSync from 'prompt-sync';
export default PromptSync({ sigint: true });