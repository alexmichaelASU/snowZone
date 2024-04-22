import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowClothingComponent } from './snow-clothing.component';

describe('SnowClothingComponent', () => {
  let component: SnowClothingComponent;
  let fixture: ComponentFixture<SnowClothingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowClothingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnowClothingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
