import { useAccount, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

export function useNetworkGuard() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const isCorrect = chain?.id === base.id;

  const enforce = () => {
    if (!isCorrect) {
      switchChain({ chainId: base.id });
    }
  };

  return { isCorrect, enforce };
}
