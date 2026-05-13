import type { ParcelHistoryItem } from '@/types';
import { HistoryTimelineItem } from './HistoryTimelineItem';

interface HistoryTimelineProps {
  history: ParcelHistoryItem[];
}

export const HistoryTimeline = ({ history }: HistoryTimelineProps) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {history.map((item, idx) => (
          <li key={item.id}>
            <HistoryTimelineItem
              item={item}
              isLast={idx === history.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
