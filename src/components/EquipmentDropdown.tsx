import { useRef } from 'react';
import type { Equipment } from '../domain/models';

export interface DropdownOption { item: Equipment; detail?: string; muted?: boolean }
interface Props {
  label: string;
  value: string | null;
  selectedItem?: Equipment;
  direct: DropdownOption[];
  directLabel?: string | null;
  oneDrone?: DropdownOption[];
  disabled?: boolean;
  unavailable?: boolean;
  warning?: string;
  onChange: (itemId: string | null) => void;
}

export function EquipmentDropdown({ label, value, selectedItem, direct, directLabel = '현재 경로에서 제작 가능', oneDrone = [], disabled, unavailable, warning, onChange }: Props) {
  const details = useRef<HTMLDetailsElement>(null);
  const all = [...direct, ...oneDrone];
  function choose(itemId: string | null) {
    onChange(itemId);
    if (details.current) details.current.open = false;
  }
  function renderOption(option: DropdownOption) {
    return <button key={option.item.id} type="button" role="option" aria-selected={value === option.item.id}
      className={`dropdown-option rarity-${option.item.rarity}${option.muted ? ' dropdown-option--muted' : ''}`}
      onClick={() => choose(option.item.id)}>
      {option.item.name}{option.detail && <span> [{option.detail}]</span>}
    </button>;
  }
  return <div className="equipment-dropdown">
    <span className="field-label">{label}</span>
    <details ref={details} className="dropdown-details" onToggle={() => {
      const node = details.current;
      if (!node?.open) return;
      node.classList.remove('dropdown-details--up');
      const menu = node.querySelector('.dropdown-menu');
      if (menu && menu.getBoundingClientRect().bottom > window.innerHeight &&
        node.getBoundingClientRect().top > menu.getBoundingClientRect().height) {
        node.classList.add('dropdown-details--up');
      }
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && details.current) { details.current.open = false; details.current.querySelector('summary')?.focus(); }
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && details.current?.open) {
        const buttons = [...details.current.querySelectorAll<HTMLButtonElement>('.dropdown-menu button')];
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
        event.preventDefault();
      }
    }}>
      <summary aria-disabled={disabled} tabIndex={disabled ? -1 : 0} onClick={(event) => { if (disabled) event.preventDefault(); }}
        className={`dropdown-trigger${selectedItem ? ` rarity-${selectedItem.rarity}` : ''}${warning ? ' dropdown-trigger--unavailable' : ''}`}>
        {selectedItem?.name ?? (disabled ? '무기 유형 선택 필요' : '선택 안 함')}
      </summary>
      {!disabled && <div className="dropdown-menu" role="listbox" aria-label={`${label} 장비`}>
        <button type="button" role="option" aria-selected={value === null} className="dropdown-option" onClick={() => choose(null)}>선택 안 함</button>
        {unavailable && selectedItem && <><span className="dropdown-group-label">현재 경로에서 제작 불가</span>{renderOption({ item: selectedItem })}</>}
        {direct.length > 0 && directLabel && <span className="dropdown-group-label">{directLabel}</span>}
        {direct.map(renderOption)}
        {oneDrone.length > 0 && <span className="dropdown-group-label">드론 배송 1회</span>}
        {oneDrone.map(renderOption)}
        {all.length === 0 && !unavailable && <span className="dropdown-empty">제작 가능 후보 없음</span>}
      </div>}
    </details>
    {warning && <span className="dropdown-warning">{warning}</span>}
  </div>;
}
