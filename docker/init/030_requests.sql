CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES donation_items(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
    application_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add an index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);

-- Add an index for faster queries on requester_id
CREATE INDEX IF NOT EXISTS idx_requests_requester_id ON requests(requester_id);

-- Add an index for faster queries on item_id
CREATE INDEX IF NOT EXISTS idx_requests_item_id ON requests(item_id);

-- Prevents a user from having multiple 'pending' requests for the same item at once
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_pending_request ON requests (item_id, requester_id) WHERE status = 'pending';