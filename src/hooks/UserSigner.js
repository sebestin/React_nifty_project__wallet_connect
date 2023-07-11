import { useMemo, useState } from "react";

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider, localProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const tx = Transactor(userSigner, gasPrice)
*/

const useUserSigner = injectedProvider => {
  const [signer, setSigner] = useState();
  // const burnerSigner = useBurnerSigner(localProvider);

  useMemo(() => {
    if (injectedProvider) {
      console.log("🦊 Using injected provider");
      const injectedSigner = injectedProvider._isProvider ? injectedProvider.getSigner() : injectedProvider;
      setSigner(injectedSigner);
    }
  }, [injectedProvider]);

  return signer;
};

export default useUserSigner;
