package com.aimedicare.aimedicare_yoshifa.services;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class SmartWatchService extends HeadlessJsTaskService{
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "SmartWatchTask",
                    Arguments.fromBundle(extras),
                    5000, // timeout for the task
                    false // optional: defines whether or not  the task is allowed in foreground. Default is false
            );
        }
        return null;
    }
}
