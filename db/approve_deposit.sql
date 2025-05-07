-- Create a stored procedure for approving deposits with transaction support
CREATE OR REPLACE FUNCTION approve_deposit(
  p_deposit_id UUID,
  p_admin_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_deposit JSONB;
  v_user_id UUID;
  v_amount DECIMAL;
  v_transaction_id UUID;
BEGIN
  -- Start transaction
  BEGIN
    -- Get deposit details
    SELECT 
      jsonb_build_object(
        'id', id,
        'user_id', user_id,
        'amount', amount,
        'payment_method', payment_method,
        'status', status
      ) INTO v_deposit
    FROM deposits
    WHERE id = p_deposit_id AND status = 'pending'
    FOR UPDATE;
    
    -- Check if deposit exists and is pending
    IF v_deposit IS NULL THEN
      RAISE EXCEPTION 'Deposit not found or not in pending status';
    END IF;
    
    -- Extract user_id and amount
    v_user_id := (v_deposit->>'user_id')::UUID;
    v_amount := (v_deposit->>'amount')::DECIMAL;
    
    -- Update deposit status
    UPDATE deposits
    SET 
      status = 'approved',
      approved_by = p_admin_id,
      approved_at = NOW(),
      updated_at = NOW()
    WHERE id = p_deposit_id;
    
    -- Add amount to user balance
    UPDATE profiles
    SET 
      balance = balance + v_amount,
      updated_at = NOW()
    WHERE id = v_user_id;
    
    -- Create transaction record
    INSERT INTO transactions (
      user_id,
      amount,
      type,
      reference_id,
      description
    ) VALUES (
      v_user_id,
      v_amount,
      'deposit',
      p_deposit_id,
      'Deposit approved'
    )
    RETURNING id INTO v_transaction_id;
    
    -- Update deposit with transaction info
    v_deposit := jsonb_set(
      v_deposit,
      '{status}',
      '"approved"'
    );
    
    v_deposit := jsonb_set(
      v_deposit,
      '{transaction_id}',
      to_jsonb(v_transaction_id)
    );
    
    -- Commit transaction
    RETURN v_deposit;
  EXCEPTION
    WHEN OTHERS THEN
      -- Rollback transaction
      RAISE;
  END;
END;
$$ LANGUAGE plpgsql;
