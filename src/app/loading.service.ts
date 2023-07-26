// loading.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private isLoading: boolean = false;

  // Show loading screen
  showLoading() {
    this.isLoading = true;
  }

  // Hide loading screen
  hideLoading() {
    this.isLoading = false;
  }

  // Check if loading screen is active
  isLoadingActive() {
    return this.isLoading;
  }
}
