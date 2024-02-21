import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalVsRxjsPageComponent } from './signal-vs-rxjs-page.component';

describe('SignalVsRxjsPageComponent', () => {
  let component: SignalVsRxjsPageComponent;
  let fixture: ComponentFixture<SignalVsRxjsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalVsRxjsPageComponent]
    });
    fixture = TestBed.createComponent(SignalVsRxjsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
