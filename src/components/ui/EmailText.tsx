/**
 * Adresse e-mail avec un seul point de coupure, avant « @ » : le domaine
 * (souvent avec un trait d'union) ne se coupe jamais au milieu.
 */
export function EmailText({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at < 0) return <>{address}</>;
  return (
    <>
      {address.slice(0, at)}
      <wbr />
      <span className="whitespace-nowrap">{address.slice(at)}</span>
    </>
  );
}
