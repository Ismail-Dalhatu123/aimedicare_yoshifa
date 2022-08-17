package com.aimedicare.aimedicare_yoshifa.watch;

import android.content.Context;

import com.inuker.bluetooth.library.model.BleGattProfile;
import com.veepoo.protocol.VPOperateManager;
import com.veepoo.protocol.listener.base.IConnectResponse;

public class FunctionsWrapper {
    private VPOperateManager getInstance(Context context){
        return VPOperateManager.getMangerInstance(context);
    }
}
