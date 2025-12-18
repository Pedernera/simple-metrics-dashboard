type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export default function ExportButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg bg-slate-100 text-slate-900 px-4 py-2 font-semibold
                 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Exportar CSV
    </button>
  );
}
