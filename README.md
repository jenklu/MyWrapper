# MyWrapper

The eventual concept of this application is to be a "MySpace" for ChatGPT. I don't like the ChatGPT
UI very much, and I know others have created better UIs. I want to allow users to customize the HTML
and CSS of this site in the same way MySpace does.

But it's more of a way for me to learn about the OpenAI API than a serious idea. Right now, the code
simply acts as a CLI inteface to GPT-3.5, allowing for back and forth context-ful conversation right
from your terminal, like:
> How tall is Barack Obama?
> 
> Barack Obama is 6 feet 1 inch (185 cm) tall.
> 
> How about Michelle?
>
> Michelle Obama is 5 feet 11 inches (180 cm) tall.


## Setup

1. Install Node and Typescript
2. Add your OPENAI_API_KEY to a .env file at the root level of the repo.
3. Run `yarn install` and `yarn start`.

You can also set the SYSTEM_PROMPT env variable if you want to use a custom prompt.
