import { createPortal } from 'react-dom';
import { TAGS, COLLECTIONS } from '../data/products';

export default function FilterSection({
  selectedTags,
  selectedCollections,
  onTagChange,
  onCollectionChange,
  onApply,
  onClear,
  isOpen,
  onClose,
}) {
  return createPortal(
    <div className={`filter-panel${isOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Filters">
      {/* Backdrop */}
      <div className="filter-panel__overlay" onClick={onClose} />

      {/* Panel */}
      <div className="filter-panel__content">
        <button
          className="filter-panel__close"
          onClick={onClose}
          aria-label="Close filters"
        >
          ✕
        </button>

        {/* Tags */}
        <div className="filter-panel__group">
          <h2 className="filter-panel__heading">Filter by Tags</h2>
          <div className="filter-panel__options">
            {TAGS.map((tag) => (
              <label key={tag} className="filter-panel__label">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagChange(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="filter-panel__group">
          <h2 className="filter-panel__heading">Filter by Collections</h2>
          <div className="filter-panel__options">
            {COLLECTIONS.map((col) => (
              <label key={col} className="filter-panel__label">
                <input
                  type="checkbox"
                  checked={selectedCollections.includes(col)}
                  onChange={() => onCollectionChange(col)}
                />
                <span>{col}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="filter-panel__actions">
          <button className="filter-panel__apply" onClick={onApply}>
            Apply Filters
          </button>
          <button className="filter-panel__clear" onClick={onClear}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
