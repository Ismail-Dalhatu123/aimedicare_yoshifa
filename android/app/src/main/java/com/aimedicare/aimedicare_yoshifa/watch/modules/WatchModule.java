package com.aimedicare.aimedicare_yoshifa.watch.modules;

import android.bluetooth.BluetoothAdapter;
import android.widget.Toast;


import com.aimedicare.aimedicare_yoshifa.watch.Events;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.inuker.bluetooth.library.Code;
import com.inuker.bluetooth.library.model.BleGattProfile;
import com.inuker.bluetooth.library.search.SearchResult;
import com.inuker.bluetooth.library.search.response.SearchResponse;
import com.veepoo.protocol.VPOperateManager;
import com.veepoo.protocol.listener.base.IBleWriteResponse;
import com.veepoo.protocol.listener.base.IConnectResponse;
import com.veepoo.protocol.listener.base.INotifyResponse;
import com.veepoo.protocol.listener.data.IBPDetectDataListener;
import com.veepoo.protocol.listener.data.IBatteryDataListener;
import com.veepoo.protocol.listener.data.IDeviceFuctionDataListener;
import com.veepoo.protocol.listener.data.IHeartDataListener;
import com.veepoo.protocol.listener.data.ILanguageDataListener;
import com.veepoo.protocol.listener.data.IPwdDataListener;
import com.veepoo.protocol.listener.data.ISocialMsgDataListener;
import com.veepoo.protocol.model.datas.BatteryData;
import com.veepoo.protocol.model.datas.BpData;
import com.veepoo.protocol.model.datas.FunctionDeviceSupportData;
import com.veepoo.protocol.model.datas.FunctionSocailMsgData;
import com.veepoo.protocol.model.datas.HeartData;
import com.veepoo.protocol.model.datas.LanguageData;
import com.veepoo.protocol.model.datas.PwdData;
import com.veepoo.protocol.model.enums.EBPDetectModel;
import com.veepoo.protocol.model.enums.ELanguage;


public class WatchModule extends ReactContextBaseJavaModule {
    private ReactContext reactContext;

    WatchModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    private final IBleWriteResponse writeResponse = new IBleWriteResponse() {
        @Override
        public void onResponse(int i) {
            show("write cmd status:" + i);
        }
    };

    private VPOperateManager getInstance() {
        return VPOperateManager.getMangerInstance(reactContext);
    }

    private void confirmDevicePassword() {
        String pwdStr = "0000";

        boolean is24Hourmodel = false;
        getInstance().confirmDevicePwd(writeResponse, new IPwdDataListener() {
            @Override
            public void onPwdDataChange(PwdData pwdData) {
                String message = "PwdData:\n" + pwdData.toString();
                show(message);
            }
        }, new IDeviceFuctionDataListener() {
            @Override
            public void onFunctionSupportDataChange(FunctionDeviceSupportData functionSupport) {
                String message = "FunctionDeviceSupportData:\n" + functionSupport.toString();
                show(message);
            }
        }, new ISocialMsgDataListener() {
            @Override
            public void onSocialMsgSupportDataChange(FunctionSocailMsgData socailMsgData) {
                String message = "FunctionSocailMsgData:\n" + socailMsgData.toString();
                show(message);
            }

            @Override
            public void onSocialMsgSupportDataChange2(FunctionSocailMsgData functionSocailMsgData) {
                String message = "FunctionSocailMsgData:\n" + functionSocailMsgData.toString();
                show(message);
            }

        }, pwdStr, is24Hourmodel);
    }

    private void changeLanguage() {
        getInstance().settingDeviceLanguage(writeResponse, new ILanguageDataListener() {
            @Override
            public void onLanguageDataChange(LanguageData languageData) {
                languageData.setLanguage(ELanguage.ENGLISH);
            }
        }, ELanguage.ENGLISH);
    }

    private void sendEvent(String eventName, WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void connect(String address, String name) {
        getInstance().connectDevice(address, name, new IConnectResponse() {
            @Override
            public void connectState(int i, BleGattProfile bleGattProfile, boolean b) {
                show("CODE RECEIVED: " + i);
                if (i == Code.REQUEST_SUCCESS) {
                    show("Connecting");
                    WritableMap params = Arguments.createMap();
                    params.putString("eventProperty", "someValue");
                    sendEvent(Events.DEVICE_IS_CONNECTING, params);
                    sendEvent(Events.DEVICE_IS_CONNECTING, params);
                } else {
                    show("Not Connecting");
                    WritableMap params = Arguments.createMap();
                    params.putString("eventProperty", "someValue");
                    sendEvent(Events.DEVICE_IS_NOT_CONNECTING, params);
                }
            }
        }, new INotifyResponse() {
            @Override
            public void notifyState(int i) {
                if (i == Code.REQUEST_SUCCESS) {
                    show("Connected!");
                    confirmDevicePassword();
                    changeLanguage();
                    WritableMap params = Arguments.createMap();
                    params.putString("eventProperty", "someValue");
                    sendEvent(Events.DEVICE_CONNECT, params);
                }
            }
        });
    }

    @ReactMethod
    private void disConnect() {
        getInstance().disconnectWatch(writeResponse);
        WritableMap params = Arguments.createMap();
        params.putBoolean("disconnected", true);
        sendEvent(Events.DEVICE_DISCONNECTED, params);
    }

    @ReactMethod
    private void startDetectBP() {
        getInstance().startDetectBP(writeResponse, new IBPDetectDataListener() {
            @Override
            public void onDataChange(BpData bpData) {
                String message = "BpData date statues:\n" + bpData.toString();
                show(message);
                int progress = bpData.getProgress();
                if (progress == 100) {
                    stopDetectBP();
                    WritableMap params = Arguments.createMap();
                    params.putInt("high", bpData.getHighPressure());
                    params.putInt("low", bpData.getLowPressure());
                    sendEvent(Events.RECEIVE_BP_DATA, params);
                }
            }
        }, EBPDetectModel.DETECT_MODEL_PUBLIC);
    }

    @ReactMethod
    private void stopDetectBP() {
        getInstance().stopDetectBP(writeResponse, EBPDetectModel.DETECT_MODEL_PUBLIC);
    }

    @ReactMethod
    private void startDetectHeart() {
        getInstance().startDetectHeart(writeResponse, new IHeartDataListener() {
            @Override
            public void onDataChange(HeartData heartData) {
                String message = "heart:\n" + heartData.toString();
                show(message);
                WritableMap params = Arguments.createMap();
                params.putString("heartStatus", heartData.getHeartStatus().toString());
                params.putInt("data", heartData.getData());
                sendEvent(Events.RECEIVE_HEART_DATA, params);
            }
        });
    }

    @ReactMethod
    private void stopDetectHeart() {
        getInstance().stopDetectHeart(writeResponse);
    }

    @ReactMethod
    private void startScan() {
        getInstance().startScanDevice(new SearchResponse() {
            @Override
            public void onSearchStarted() {
                show("Search Started");
            }

            @Override
            public void onDeviceFounded(SearchResult searchResult) {
                WritableMap params = Arguments.createMap();
                params.putString("address", searchResult.getAddress());
                params.putString("name", searchResult.getName());
                sendEvent(Events.DEVICE_FOUND, params);
            }

            @Override
            public void onSearchStopped() {
                show("Search Stopped");
            }

            @Override
            public void onSearchCanceled() {
                show("Search Cancelled");
            }
        });
    }

    @ReactMethod
    public void stopScan(){
        getInstance().stopScanDevice();
    }

    @ReactMethod
    public void show(String msg) {
//        Toast.makeText(reactContext, msg, Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void isBluetoothSupported(Promise promise) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (bluetoothAdapter == null) promise.resolve(false);
        promise.resolve(true);
    }

    @ReactMethod
    public void isBluetoothEnabled(Promise promise) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        promise.resolve(bluetoothAdapter.isEnabled());
    }

    @ReactMethod
    public void turnOnBluetooth() {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        bluetoothAdapter.enable();
    }

    @ReactMethod
    public void turnOffBluetooth() {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        bluetoothAdapter.disable();
    }

    @ReactMethod
    public void startDetectBattery(){
        getInstance().readBattery(writeResponse, new IBatteryDataListener() {
            @Override
            public void onDataChange(BatteryData batteryData) {
                WritableMap params = Arguments.createMap();
                params.putInt("level", batteryData.getBatteryLevel());
                sendEvent(Events.DEVICE_BATTER_LEVE_CHANGE, params);
            }
        });
    }

    @ReactMethod
    public void getSleepData(Promise promise){

    }

    @Override
    public String getName(){
        return  "WatchModule";
    }
}
