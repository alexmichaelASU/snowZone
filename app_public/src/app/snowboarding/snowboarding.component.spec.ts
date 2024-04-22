import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowboardingComponent } from './snowboarding.component';

describe('SnowboardingComponent', () => {
  let component: SnowboardingComponent;
  let fixture: ComponentFixture<SnowboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnowboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
