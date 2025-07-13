import { Anchor } from "react95";

export const WhoMadeThis = () => {
  return (
    <>
      Created in&nbsp;
      <Anchor
        href="https://code.visualstudio.com"
        target="_blank"
        hrefLang="en-gb"
        rel="noopener noreferrer"
        aria-label="VS Code"
      >
        VS Code
      </Anchor>
      , built in&nbsp;
      <Anchor
        href="https://react.dev/"
        target="_blank"
        hrefLang="en-gb"
        rel="noopener noreferrer"
        aria-label="React"
      >
        React
      </Anchor>
      &nbsp;and&nbsp;
      <Anchor
        href="https://react95.io/"
        target="_blank"
        hrefLang="en-gb"
        rel="noopener noreferrer"
        aria-label="react95"
      >
        react95
      </Anchor>
      ,&nbsp;deployed to&nbsp;
      <Anchor
        href="https://www.cloudflare.com"
        target="_blank"
        hrefLang="en-gb"
        rel="noopener noreferrer"
        aria-label="Cloudflare"
      >
        Cloudflare
      </Anchor>
    </>
  );
};
